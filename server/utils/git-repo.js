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
    this.localFolderName = 'repo';
    this.settings = {};
    this.updateSettings = this.updateSettings.bind(this);
    this.getInitialSettings = this.getInitialSettings.bind(this);
    this.getRecentCommits = this.getRecentCommits.bind(this);
    this.checkCommits = this.checkCommits.bind(this);
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

        await this.checkCommits(true);
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

    await this.checkCommits(true);
  }

  async checkCommits(onlyLast) {
    const commits = await this.getRecentCommits(onlyLast);

    for (let i = 0; i < commits.length; i++) {
      const commitHash = commits[i];

      if (commitHash) await this.getInfoByHash(commitHash);
    }

    clearTimeout(this.periodTimeout);

    this.periodTimeout = setTimeout(() => this.queue.push(this.checkCommits), this.settings.period * 60 * 1000);
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
    const { stdout } = await this.run(
      `cd ${this.localFolderName} && git show ${commitHash} --pretty=format:"%s{SPLIT}%an{END}"`,
    );
    const [commitMessage, authorName] = stdout.split('{END}')[0].split('{SPLIT}');

    logger.debug(`GitRepo - get info by hash ${commitHash}`);

    await buildAgent.addToQueue({
      commitHash,
      commitMessage,
      branchName: this.settings.mainBranch,
      authorName,
    });
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

  async getRecentCommits(onlyLast) {
    await this.run(`cd ${this.localFolderName} && git pull`);

    logger.debug('GitRepo - get recent commits');

    const command = onlyLast
      ? 'git log -1 --pretty=format:"%H{SPLIT}"'
      : `git log --since="${this.lastCheckingCommitTime.toISOString()}" --pretty=format:"%H{SPLIT}"`;

    const { stdout } = await this.run(`cd ${this.localFolderName} && ${command}`);

    const listCommits = stdout.split('{SPLIT}');

    this.lastCheckingCommitTime = new Date();

    return listCommits;
  }
}

const gitRepo = new GitRepo();

module.exports = gitRepo;
