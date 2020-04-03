/* eslint-disable class-methods-use-this */
const pino = require('pino');
const storageAPI = require('../api/storage-api');
const logString = require('./log-util');

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: true,
});

/**
 * Обработка очереди билдов
 */
class BuildAgent {
  constructor() {
    /** Очередь выполнения билдов */
    this.queue = [];

    this.processQueue = this.processQueue.bind(this);

    this.processQueue();

    this.getItems();
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

  /**
   * Выполнение билда
   * Пока используется SetTimeout вместо реального билда
   */
  async build({ id }) {
    const startBuilding = new Date().valueOf();

    logger.debug(`BuildAgent - start build ${id}`);

    const date = new Date().valueOf() + 3 * 60 * 60 * 1000;

    try {
      await storageAPI.setBuildStart({
        buildId: id,
        dateTime: new Date(date).toISOString(),
      });
    } catch (error) {
      logger.error(`Error in add build ${error}`);
      throw new Error(error);
    }
    try {
      return new Promise((res) => {
        setTimeout(async () => {
          const endBuilding = new Date().valueOf();

          await storageAPI.setBuildFinish({
            buildId: id,
            duration: endBuilding - startBuilding,
            success: true,
            buildLog: logString,
          });

          logger.debug(`BuildAgent - finish build ${id}`);

          res();
        }, 3000);
      });
    } catch (error) {
      logger.error(`Error in add finish ${error}`);
      throw new Error(error);
    }
  }

  /**
   * Добавление билда в очередь
   */
  async getItems() {
    try {
      const {
        data: { data },
      } = await storageAPI.getBuildList();

      const waitingItems = data.filter(
        (el) => el.status === 'Waiting' && !this.queue.find((item) => item.id === el.id),
      );

      waitingItems.forEach((build) => {
        logger.debug(
          `BuildAgent - add to queue ${build.commitMessage} ${build.commitHash} ${build.authorName}`,
        );
        this.queue.push(build);
      });
    } catch (error) {
    } finally {
      setTimeout(() => {
        this.getItems();
      }, 3000);
    }
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
