const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const pino = require('pino');
const storageAPI = require('../api/storage-api');

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

  /**
   * Возвращает последний коммит
   */
  async getLastCommit() {
    if (this.localRepoIsExist) {
      await this.run(`cd ${this.localFolderName} && git pull`);

      const { stdout } = await this.run(`cd ${this.localFolderName} && git log -1 --pretty=format:"%H %s %an"`);

      const commit = stdout.split(' ');

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
  }
}

const git = new GitRepo();

module.exports = git;
