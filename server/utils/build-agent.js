// const parseGitLog = require('parse-git-log');
const storageAPI = require('../api/storage-api');
const git = require('./git-repo');

class BuildAgent {
  constructor() {
    this.period = null;

    this.buildCommand = null;

    this.mainBranch = null;

    this.timeoutId = null;

    this.queue = [];

    this.processQueue();

    this.getInitialSettings();
  }

  cancel() {}

  async build({ id }) {
    const startBuilding = new Date().valueOf();

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
  }

  async processQueue() {
    if (this.queue[0]) {
      const item = this.queue[0];
      await this.build(item);
      this.processQueue();
    } else {
      setTimeout(() => {
        this.processQueue();
      }, 1000);
    }
  }

  async updateQueue() {
    const {
      data: { data },
    } = await storageAPI.getBuildList();

    data.forEach(el => {
      if (
        el.status === 'Waiting' &&
        !this.queue.find(item => item.commitHash === el.commitHash)
      ) {
        this.queue.push(el);
      }
    });
  }

  async getLastCommits() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    try {
      const {
        commitHash,
        commitMessage,
        authorName,
      } = await git.getLastCommit();

      const {
        data: { data },
      } = await storageAPI.getBuildList();

      if (!data.find(el => el.commitHash === commitHash)) {
        await storageAPI.setBuildRequest({
          commitMessage,
          commitHash,
          branchName: this.mainBranch,
          authorName,
        });

        this.updateQueue();
      }
    } catch (error) {
      console.error(error);
    }

    this.timeoutId = setTimeout(() => {
      this.getLastCommits();
    }, this.period);
  }

  async getInitialSettings() {
    const {
      data: { buildCommand, period, mainBranch },
    } = await storageAPI.getConfig();

    this.updateSettings({ buildCommand, period, mainBranch });
  }

  updateSettings({
    buildCommand = 'npm run build',
    period = 10,
    mainBranch = 'master',
  }) {
    this.period = period * 60 * 1000;
    this.buildCommand = buildCommand;
    this.mainBranch = mainBranch;
    this.getLastCommits();
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
