/* eslint-disable class-methods-use-this */
const pino = require('pino');
const storageAPI = require('../api/storage-api');

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

    try {
      await storageAPI.setBuildStart({
        buildId: id,
        dateTime: new Date().toISOString(),
      });

      return new Promise((res) => {
        setTimeout(async () => {
          const endBuilding = new Date().valueOf();

          await storageAPI.setBuildFinish({
            buildId: id,
            duration: endBuilding - startBuilding,
            success: true,
            buildLog: `
            Starting type checking and linting service...
            Hash: dd4de1672f8b930672ce
            Version: webpack 4.41.5
            Time: 904ms
            Built at: 07.03.2020 21:27:07
                Asset      Size  Chunks             Chunk Names
            script.js  2.43 KiB       0  [emitted]  main
            style.css  17.4 KiB       0  [emitted]  main
            Entrypoint main = style.css script.js
             [0] ./src/base.blocks/avatar/avatar.scss 39 bytes {0} [built]
             [1] ./src/base.blocks/brand-logo/brand-logo.scss 39 bytes {0} [built]  
             [2] ./src/base.blocks/button/button.scss 39 bytes {0} [built]
             [3] ./src/base.blocks/card/card.scss 39 bytes {0} [built]
             [4] ./src/base.blocks/form/form.scss 39 bytes {0} [built]
             [5] ./src/base.blocks/e-accordion/e-accordion.scss 39 bytes {0} [built]
             [6] ./src/base.blocks/grid/grid.scss 39 bytes {0} [built]
             [7] ./src/base.blocks/icon-plus/icon-plus.scss 39 bytes {0} [built]    
             [8] ./src/base.blocks/image/image.scss 39 bytes {0} [built]
             [9] ./src/base.blocks/informer/informer.scss 39 bytes {0} [built]      
            [10] ./src/base.blocks/input/input.scss 39 bytes {0} [built]
            [11] ./src/base.blocks/layout/layout.scss 39 bytes {0} [built]
            [12] ./src/base.blocks/list/list.scss 39 bytes {0} [built]
            [13] ./src/base.blocks/placeholder/placeholder.scss 39 bytes {0} [built]
            [27] ./src/index.js + 2 modules 4.04 KiB {0} [built]
                 | ./src/index.js 2.64 KiB [built]
                 | ./src/base.blocks/e-accordion/e-accordion.js 570 bytes [built]
                 | ./src/content.blocks/onoffswitch/onoffswitch.js 736 bytes [built]
                + 40 hidden modules
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/avatar/avatar.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/avatar/avatar.scss 320 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/brand-logo/brand-logo.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/brand-logo/brand-logo.scss 643 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/button/button.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/button/button.scss 477 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/card/card.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/card/card.scss 1.35 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/e-accordion/e-accordion.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/e-accordion/e-accordion.scss 310 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/form/form.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/form/form.scss 2.7 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/grid/grid.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/grid/grid.scss 1.01 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/icon-plus/icon-plus.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/icon-plus/icon-plus.scss 483 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/image/image.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/image/image.scss 436 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/informer/informer.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/informer/informer.scss 899 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/input/input.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/input/input.scss 492 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/layout/layout.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/layout/layout.scss 836 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/list/list.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/list/list.scss 1.1 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/placeholder/placeholder.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/placeholder/placeholder.scss 343 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/section/section.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/section/section.scss 560 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/text/text.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/text/text.scss 2.17 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/base.blocks/theme/theme.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/base.blocks/theme/theme.scss 5.44 KiB {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/cover/cover.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/cover/cover.scss 408 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/event/event.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/event/event.scss 496 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/footer/footer.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/footer/footer.scss 484 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/header/header.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/header/header.scss 575 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/history/history.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/history/history.scss 431 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/onoffswitch/onoffswitch.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/onoffswitch/onoffswitch.scss 491 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/payment/payment.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/payment/payment.scss 322 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/product/product.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/product/product.scss 429 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/content.blocks/warning/warning.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/content.blocks/warning/warning.scss 452 bytes {0} [built]
                    + 1 hidden module
            Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/dist/cjs.js!src/pages/index.scss:
                Entrypoint mini-css-extract-plugin = *
                [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/pages/index.scss 311 bytes {0} [built]
                    + 1 hidden module`,
          });

          logger.debug(`BuildAgent - finish build ${id}`);

          res();
        }, 3000);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Добавление билда в очередь
   */
  async addToQueue({ commitMessage, commitHash, branchName, authorName }) {
    const {
      data: { data },
    } = await storageAPI.getBuildList();

    const item = data.find((el) => el.commitHash === commitHash);

    if (!item) {
      logger.debug(`BuildAgent - add to queue ${commitMessage} ${commitHash} ${authorName}`);

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

      const build = list.data.data.find((el) => el.commitHash === commitHash);

      if (!this.queue.find((el) => el.commitHash === commitHash)) {
        this.queue.push(build);
      }
    }
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
