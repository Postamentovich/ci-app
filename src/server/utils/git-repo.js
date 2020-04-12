const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
const pino = require("pino");
const { storageAPI } = require("../api/storage-api");

const level = process.env.NODE_ENV === "test" ? "silent" : process.env.LOG_LEVEL || "info";

const logger = pino({
    level,
    prettyPrint: true,
});

/**
 * Локальный репозиторий Git
 */
class GitRepo {
    constructor() {
        /** Имя локальной папки для репозитория */
        this.localFolderName = "repo";

        /** Настройки пользователя */
        this.settings = { period: 10 };

        /** Timeout для проверки коммитов */
        this.periodTimeout = null;

        this.updateSettings = this.updateSettings.bind(this);
        this.getInitialSettings = this.getInitialSettings.bind(this);
        this.getRecentCommits = this.getRecentCommits.bind(this);
        this.checkCommits = this.checkCommits.bind(this);

        this.getInitialSettings();
    }

    /**
     * Получение начальных настроек пользователя
     */
    async getInitialSettings() {
        try {
            logger.debug("GitRepo - get user settings");

            const {
                data: { data },
            } = await storageAPI.getConfig();

            if (data && data.repoName) {
                logger.debug("GitRepo - user settings found");

                this.settings = data;

                if (!this.localRepoIsExist) {
                    await this.clone(data.repoName);

                    await this.checkout(data.mainBranch);
                }

                await this.checkCommits();
            } else {
                logger.debug("GitRepo - user settings not found");
            }
        } catch (error) {
            logger.error("GitRepo - error in getting initial settings");
        }
    }

    /**
     * Обновление настроек пользователя
     *
     * @param {Object} settings
     */
    async updateSettings(settings) {
        logger.debug("GitRepo - update settings");

        const { repoName, mainBranch } = settings;

        const updateLocalRepo = async () => {
            await this.clone(repoName);

            await this.checkout(mainBranch);

            await storageAPI.deleteConfig();
        };

        if (repoName !== this.settings.repoName || !this.localRepoIsExist) {
            await updateLocalRepo();
        } else if (mainBranch !== this.settings.mainBranch) {
            await this.checkout(mainBranch);
        }

        /** Обновление значений в базе */
        await storageAPI.setConfig(settings);

        this.settings = settings;

        await this.checkCommits();
    }

    /**
     * Проверка новых коммитов
     *
     */
    async checkCommits() {
        clearTimeout(this.periodTimeout);

        const commits = await this.getRecentCommits();

        for (let i = 0; i < commits.length; i++) {
            const commitHash = commits[i];

            if (commitHash && commitHash.length > 0) await this.addBuildToQueue(commitHash);
        }

        const period = Number(this.settings.period) || 10;

        logger.debug(`GitRepo - next check commits after ${period} minutes`);

        this.periodTimeout = setTimeout(() => this.checkCommits, period * 60 * 1000);
    }

    /**
     * Проверка существует репозиторий локально или нет
     */
    get localRepoIsExist() {
        try {
            const stat = fs.statSync(`${this.localFolderName}`);

            logger.debug("GitRepo - local repo found");

            return stat.isDirectory();
        } catch (error) {
            logger.debug("GitRepo - local repo not found");
            return false;
        }
    }

    /**
     * Выполнение комманды
     * @param {string} command
     */
    async run(command) {
        try {
            return exec(command);
        } catch (error) {
            return false;
        }
    }

    /**
     * Клонирует репозиторий
     * @param {string} repoName
     */
    async clone(repoName) {
        await this.removeLocalRepo();

        logger.debug(`GitRepo - clone repo ${repoName}`);

        const command = `git clone https://github.com/${repoName} ${this.localFolderName}`;

        return this.run(command);
    }

    /**
     * Удаляет локальный репозиторий
     */
    async removeLocalRepo() {
        if (this.localRepoIsExist) {
            logger.debug("GitRepo - remove local repo");

            const command = `rm -rf ${this.localFolderName}`;

            await this.run(command);
        }

        return null;
    }

    /**
     * Переключает на нужную ветку
     * @param {string} mainBranch
     */
    checkout(mainBranch) {
        logger.debug(`GitRepo - checkout to branch ${mainBranch}`);

        const command = `cd ${this.localFolderName} && git checkout ${mainBranch}`;

        return this.run(command);
    }

    /**
     * Добавление билда в очередь
     *
     * @param {string} commitHash
     */
    async addBuildToQueue(commitHash) {
        if (commitHash) {
            logger.debug(`GitRepo - get info by hash ${commitHash}`);

            const { stdout } = await this.run(
                `cd ${this.localFolderName} && git log -1 --format="%s{SPLIT}%an{SPLIT}" ${commitHash}`
            );

            const out = stdout.split("{SPLIT}");

            const [commitMessage, authorName] = out;

            try {
                const { data } = await storageAPI.setBuildRequest({
                    commitHash: String(commitHash),
                    commitMessage: String(commitMessage),
                    branchName: String(this.settings.mainBranch),
                    authorName: String(authorName),
                });

                logger.debug(`GitRepo - add to queue ${commitHash}`);

                return data;
            } catch (error) {
                logger.error(error);
                logger.error(
                    `error in setrequest commitHash: ${commitHash} commitMessage: ${commitMessage} authorName: ${authorName} mainBranch: ${this.settings.mainBranch}`
                );
            }
        }

        return null;
    }

    /**
     * Получение последних коммитов
     *
     */
    async getRecentCommits() {
        await this.run(`cd ${this.localFolderName} && git pull origin ${this.settings.mainBranch}`);

        logger.debug("GitRepo - get recent commits");

        const command = 'git log -10 --pretty=format:"%H{SPLIT}"';

        const { stdout } = await this.run(`cd ${this.localFolderName} && ${command}`);

        const listCommits = stdout.split("{SPLIT}").map((el) => el.replace(/\s/g, ""));

        try {
            const {
                data: { data },
            } = await storageAPI.getBuildList();

            const filteredCommits = listCommits.filter((hash) => {
                const item = data.find((el) => el.commitHash === hash);

                if (item || hash.length === 0) return false;

                return true;
            });

            logger.debug(`GitRepo - filtered recent commits: ${filteredCommits}`);

            return filteredCommits;
        } catch (error) {
            logger.error(error);

            logger.debug(`GitRepo - recent commits: ${listCommits}`);

            return listCommits;
        }
    }
}

const gitRepo = new GitRepo();

module.exports = gitRepo;
