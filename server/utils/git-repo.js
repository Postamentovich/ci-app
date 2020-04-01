/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const pino = require('pino');
const storageAPI = require('../api/storage-api');
const buildAgent = require('./build-agent');

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: true,
});

/**
 * Локальный репозиторий Git
 */
class GitRepo {
  constructor() {
    /** Имя локальной папки для репозитория */
    this.localFolderName = 'repo';

    /** Настройки пользователя */
    this.settings = { period: 10 };

    /** Время последний проверки коммитов */
    // this.lastCheckingCommitTime = null;

    /** Timeout для проверки коммитов */
    this.periodTimeout = null;

    this.updateSettings = this.updateSettings.bind(this);
    this.getInitialSettings = this.getInitialSettings.bind(this);
    this.getRecentCommits = this.getRecentCommits.bind(this);
    this.checkCommits = this.checkCommits.bind(this);

    /** Очередь выполнения задач */
    this.queue = [this.getInitialSettings];

    this.processQueue();
  }

  /**
   * Обработка очереди задач
   */
  async processQueue() {
    if (this.queue[0]) {
      const action = this.queue.shift();

      await action();

      this.processQueue();
    } else {
      setTimeout(() => {
        this.processQueue();
      }, 1000);
    }
  }

  /**
   * Получение начальных настроек пользователя
   */
  async getInitialSettings() {
    try {
      logger.debug('GitRepo - get user settings');

      const {
        data: { data },
      } = await storageAPI.getConfig();

      if (data && data.repoName) {
        logger.debug('GitRepo - user settings found');

        this.settings = data;

        if (!this.localRepoIsExist) {
          await this.clone(data.repoName);

          await this.checkout(data.mainBranch);
        }

        await this.checkCommits();
      } else {
        logger.debug('GitRepo - user settings not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Обновление настроек пользователя
   *
   * @param {Object} settings
   */
  async updateSettings(settings) {
    logger.debug('GitRepo - update settings');

    const { repoName, mainBranch } = settings;

    if (repoName !== this.settings.repoName) {
      await this.clone(repoName);

      await this.checkout(mainBranch);
    } else if (mainBranch !== this.settings.mainBranch) {
      await this.checkout(mainBranch);
    }

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

      if (commitHash && commitHash.length > 0) await this.getInfoByHash(commitHash.replace(/\s/g, ''));
    }

    this.periodTimeout = setTimeout(() => this.checkCommits, this.settings.period * 60 * 1000);
  }

  /**
   * Проверка существует репозиторий локально или нет
   */
  get localRepoIsExist() {
    try {
      const stat = fs.statSync(`${this.localFolderName}`);

      logger.debug('GitRepo - local repo found');

      return stat.isDirectory();
    } catch (error) {
      logger.debug('GitRepo - local repo not found');
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
      logger.debug('GitRepo - remove local repo');

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
   * Получение информации о коммите по хэшу
   *
   * @param {string} commitHash
   */
  async getInfoByHash(commitHash) {
    if (commitHash) {
      logger.debug(`GitRepo - get info by hash ${commitHash}`);

      const { stdout } = await this.run(
        `cd ${this.localFolderName} && git log -1 --format="%s{SPLIT}%an{SPLIT}" ${commitHash}`,
      );

      const out = stdout.split('{SPLIT}');

      const [commitMessage, authorName] = out;

      try {
        await storageAPI.setBuildRequest({
          commitHash: String(commitHash),
          commitMessage: String(commitMessage),
          branchName: String(this.settings.mainBranch),
          authorName: String(authorName),
        });

        logger.debug(`GitRepo - add to queue ${commitHash}`);

        return {
          commitHash: String(commitHash),
          commitMessage: String(commitMessage),
          branchName: String(this.settings.mainBranch),
          authorName: String(authorName),
        };
      } catch (error) {
        logger.error(error);
        logger.error(
          `error in setrequest commitHash: ${commitHash} commitMessage: ${commitMessage} authorName: ${authorName} mainBranch: ${this.settings.mainBranch}`,
        );
      }
    }

    return null;
  }

  /**
   * Добавление обновления настроек в очередь задач
   * Сделано для того, что бы работа с репозиторием происходила последовательно,
   *
   * @param {Object} settings
   */
  // addSettingsToQueue(settings) {
  //   this.queue.push(async () => this.updateSettings(settings));
  // }

  async timeout() {
    return new Promise(res =>
      setTimeout(() => {
        res();
      }, 300),
    );
  }

  /**
   * Получение последних коммитов
   *
   * @param {boolean} onlyLast - Флаг, брать только последний коммит или все коммиты за период
   */
  async getRecentCommits() {
    await this.run(`cd ${this.localFolderName} && git pull origin ${this.settings.mainBranch}`);

    logger.debug('GitRepo - get recent commits');

    const command = 'git log -10 --pretty=format:"%H{SPLIT}"';

    const { stdout } = await this.run(`cd ${this.localFolderName} && ${command}`);

    const listCommits = await stdout.split('{SPLIT}');

    const {
      data: { data },
    } = await storageAPI.getBuildList();

    const filteredCommits = listCommits.filter(hash => {
      const item = data.find(el => el.commitHash === hash);

      if (item) return false;

      return true;
    });

    logger.debug(`GitRepo - recent commits: ${filteredCommits}`);

    return filteredCommits;
  }
}

const gitRepo = new GitRepo();

module.exports = gitRepo;
