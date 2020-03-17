const createError = require('http-errors');
const pino = require('pino');
const storageAPI = require('../api/storage-api');
const gitRepo = require('./git-repo');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
});
class BuildAgent {
  constructor() {
    // this.period = null;
    // this.buildCommand = null;
    // this.mainBranch = null;
    // this.timeoutId = null;
    // // this.queue = [];
    // // this.processQueue();
    // // this.getInitialSettings();
    // this.settings = {};
    // this.updateSettings = this.updateSettings.bind(this);
    // this.getInitialSettings = this.getInitialSettings.bind(this);
    this.processQueue = this.processQueue.bind(this);
    this.queue = [];
    this.processQueue();
  }

  /**
   * Обработка очереди задач
   */
  async processQueue() {
    if (this.queue[0]) {
      const item = this.queue.shift();

      await this.build(item);

      this.processQueue();
    } else {
      setTimeout(() => {
        this.processQueue();
      }, 1000);
    }
  }

  // /**
  //  * Получение начальных настроек
  //  */
  // async getInitialSettings() {
  //   try {
  //     const {
  //       data: { data },
  //     } = await storageAPI.getConfig();

  //     logger.debug('BuildAgent - get user settings');

  //     if (data && data.repoName) {
  //       this.settings = data;
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // cancel() {}

  async build({ id }) {
    const startBuilding = new Date().valueOf();

    logger.debug(`BuildAgent -build ${id}`);
    try {
      await storageAPI.setBuildStart({
        buildId: id,
        dateTime: new Date().toISOString(),
      });

      return new Promise((res, rej) => {
        setTimeout(async () => {
          const endBuilding = new Date().valueOf();
          console.log(`build ${id}`);
          await storageAPI.setBuildFinish({
            buildId: id,
            duration: endBuilding - startBuilding,
            success: true,
            buildLog: `string ${Date.now().toString()}`,
          });

          res();
        }, 3000);
      });
    } catch (error) {
      return Promise.reject();
    }
  }

  async addToQueue({ commitMessage, commitHash, branchName, authorName }) {
    logger.debug(`BuildAgent - add to queue ${commitMessage} ${commitHash} ${authorName}`);

    await storageAPI.setBuildRequest({
      commitMessage,
      commitHash,
      branchName,
      authorName,
    });

    const {
      data: { data },
    } = await storageAPI.getBuildList();

    const item = data.find(el => el.commitHash === commitHash);

    if (item && !this.queue.find(el => el.commitHash === commitHash)) {
      this.queue.push(item);
    }
  }

  // async updateQueue() {

  //   data.forEach(el => {
  //     if (el.status === 'Waiting' && !this.queue.find(item => item.commitHash === el.commitHash)) {
  //       this.queue.push(el);
  //     }
  //   });
  // }

  // async getLastCommits() {
  //   if (this.timeoutId) clearTimeout(this.timeoutId);
  //   try {
  //     const commit = await gitRepo.getLastCommit();

  //     const { commitHash, commitMessage, authorName } = commit;

  //     const {
  //       data: { data },
  //     } = await storageAPI.getBuildList();

  //     if (!data.find(el => el.commitHash === commitHash)) {

  //       this.updateQueue();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   this.timeoutId = setTimeout(() => {
  //     this.getLastCommits();
  //   }, this.period);
  // }

  // updateSettings({ buildCommand = 'npm run build', period = 10, mainBranch = 'master' }) {
  //   this.period = period * 60 * 1000;
  //   this.buildCommand = buildCommand;
  //   this.mainBranch = mainBranch;
  //   this.getLastCommits();
  // }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
