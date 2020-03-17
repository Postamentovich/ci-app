const createError = require('http-errors');
const pino = require('pino');
const storageAPI = require('../api/storage-api');

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: true,
});
class BuildAgent {
  constructor() {
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

  async build({ id }) {
    const startBuilding = new Date().valueOf();

    logger.debug(`BuildAgent - start build ${id}`);

    try {
      await storageAPI.setBuildStart({
        buildId: id,
        dateTime: new Date().toISOString(),
      });

      return new Promise((res, rej) => {
        setTimeout(async () => {
          const endBuilding = new Date().valueOf();

          await storageAPI.setBuildFinish({
            buildId: id,
            duration: endBuilding - startBuilding,
            success: true,
            buildLog: `string ${Date.now().toString()}`,
          });

          logger.debug(`BuildAgent - finish build ${id}`);

          res();
        }, 3000);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToQueue({ commitMessage, commitHash, branchName, authorName }) {
    logger.debug(`BuildAgent - add to queue ${commitMessage} ${commitHash} ${authorName}`);

    const {
      data: { data },
    } = await storageAPI.getBuildList();

    const item = data.find(el => el.commitHash === commitHash);

    if (!item) {
      try {
        await storageAPI.setBuildRequest({
          commitMessage,
          commitHash,
          branchName,
          authorName,
        });
      } catch (error) {
        throw new Error(error);
      }

      const list = await storageAPI.getBuildList();

      const build = list.data.data.find(el => el.commitHash === commitHash);

      if (!this.queue.find(el => el.commitHash === commitHash)) {
        this.queue.push(build);
      }
    }
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
