// const parseGitLog = require('parse-git-log');
const storageAPI = require('../api/storage-api');
const git = require('./git-repo');
const CommitSummary = require('./commit-branches');

class BuildAgent {
  constructor() {
    this.period = null;

    this.buildCommand = null;

    this.mainBranch = null;

    this.timeoutId = null;

    this.queue = [];

    this.getInitialSettings();
  }

  start() {}

  end() {}

  cancel() {}

  processQueue() {
    while (this.queue[0]) {
      const {} = this.queue.shift();
    }
  }

  async updateQueue() {
    const {
      data: { data },
    } = await storageAPI.getBuildList();
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

    this.timeoutId = setTimeout(this.getLastCommits, this.period);
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
