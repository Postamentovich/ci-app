const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const pino = require('pino');
const storageAPI = require('../api/storage-api');
const buildAgent = require('./build-agent');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
});

/**
 * Локальный репозиторий Git
 */
class GitRepo {
  constructor() {
    this.localFolderName = 'repo';
    this.settings = {};
    this.updateSettings = this.updateSettings.bind(this);
    this.getInitialSettings = this.getInitialSettings.bind(this);
    this.getRecentCommits = this.getRecentCommits.bind(this);
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
   * Получение начальных настроек
   */
  async getInitialSettings() {
    try {
      const {
        data: { data },
      } = await storageAPI.getConfig();

      logger.debug('GitRepo - get user settings');

      if (data && data.repoName) {
        this.settings = data;

        if (!this.localRepoIsExist) {
          await this.clone(data.repoName);

          await this.checkout(data.mainBranch);
        }

        const commit = await this.getLastCommit();

        // buildAgent.addToQueue(commit.commitHash);

        // buildAgent.addToQueue(commit);

        clearTimeout(this.periodTimeout);

        this.periodTimeout = setTimeout(() => this.queue.push(this.getRecentCommits), data.period * 60 * 1000);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Проверка существует репозиторий локально или нет
   */
  get localRepoIsExist() {
    logger.debug('GitRepo - check local repo is exist');
    try {
      const stat = fs.statSync(`${this.localFolderName}`);
      return stat.isDirectory();
    } catch (error) {
      return false;
    }
  }

  /**
   * Запускает выполнение комманды
   * @param {*} command
   */
  async run(command) {
    return exec(command);
  }

  /**
   * Клонирует репозиторий
   * @param {*} repoName
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
      return this.run(command);
    }
    return null;
  }

  /**
   * Переключает на нужную ветку
   * @param {*} mainBranch
   */
  checkout(mainBranch) {
    logger.debug(`GitRepo - checkout to branch ${mainBranch}`);
    const command = `cd ${this.localFolderName} && git checkout ${mainBranch}`;
    return this.run(command);
  }

  async getInfoByHash(commitHash) {
    if (this.localRepoIsExist) {
      const { stdout } = await this.run(
        `cd ${this.localFolderName} && git show ${commitHash} --pretty=format:"%s{SPLIT}%an{END}"`,
      );
      const [commitMessage, authorName] = stdout.split('{END}')[0].split('{SPLIT}');

      await buildAgent.addToQueue({
        commitHash,
        commitMessage,
        branchName: this.settings.mainBranch,
        authorName,
      });

      logger.debug(`GitRepo - get info by hash ${commitHash}`);
    }

    return null;
  }

  /**
   * Возвращает последний коммит
   */
  async getLastCommit() {
    if (this.localRepoIsExist) {
      await this.run(`cd ${this.localFolderName} && git pull`);

      const { stdout } = await this.run(
        `cd ${this.localFolderName} && git log -1 --pretty=format:"%H{SPLIT}%s{SPLIT}%an{SPLIT}"`,
      );

      this.lastCheckingCommitTime = new Date();

      const commit = stdout.split('{SPLIT}');

      logger.debug(`GitRepo - get last commit: ${commit}`);

      const [commitHash, commitMessage, authorName] = commit;

      return {
        commitHash,
        commitMessage,
        authorName,
      };
    }

    return null;
  }

  /**
   * Добавление обновления настроек в очередь задач
   * Сделано для того, что-бы работа с репозиторием происходила последовательно,
   * И одна задача не мешала другой
   *
   * @param {Object}} settings
   */
  addSettingsToQueue(settings) {
    this.queue.push(async () => this.updateSettings(settings));
  }

  async getRecentCommits() {
    if (this.localRepoIsExist) {
      await this.run(`cd ${this.localFolderName} && git pull`);

      const { stdout } = await this.run(
        `cd ${
          this.localFolderName
        } && git log --since="${this.lastCheckingCommitTime.toISOString()}" --pretty=format:"%H{SPLIT}%s{SPLIT}%an{END}"`,
      );

      const listCommits = stdout.split('{END}').map(commit => {
        const [commitHash, commitMessage, authorName] = commit.split('{SPLIT}');

        return {
          commitHash,
          commitMessage,
          authorName,
        };
      });

      logger.debug(
        '%O',
        `GitRepo - get recent commit since ${this.lastCheckingCommitTime.toISOString()} : ${listCommits}`,
      );

      this.lastCheckingCommitTime = new Date();
    }

    this.periodTimeout = setTimeout(() => this.queue.push(this.getRecentCommits), this.settings.period * 60 * 1000);

    return null;
  }

  /**
   * Обновление настроек пользователя
   *
   * @param {Object} settings
   */
  async updateSettings(settings) {
    logger.debug('GitRepo - update settings');

    const { repoName, mainBranch, period } = settings;

    if (repoName !== this.settings.repoName) {
      await this.clone(repoName);

      await this.checkout(mainBranch);
    } else if (mainBranch !== this.settings.mainBranch) {
      await this.checkout(mainBranch);
    }

    const commit = await this.getLastCommit();

    await this.getInfoByHash(commit.commitHash);

    clearTimeout(this.periodTimeout);

    this.periodTimeout = setTimeout(() => this.queue.push(this.getRecentCommits), period * 60 * 1000);

    this.settings = settings;
  }
}

const gitRepo = new GitRepo();

module.exports = gitRepo;
