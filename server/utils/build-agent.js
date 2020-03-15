// const parseGitLog = require('parse-git-log');
const storageAPI = require('../api/storage-api');
const git = require('./git-repo');
const CommitSummary = require('./commit-branches');

class BuildAgent {
  constructor() {
    this.period = null;

    this.buildCommand = null;

    this.timeoutId = null;

    this.getInitialSettings();
  }

  start() {}

  end() {}

  cancel() {}

  async getLastCommits() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    try {
      const commits = await git.getLastCommits();
      const summary = CommitSummary.parse(commits);
      // const json = JSON.parse(summary);
      // parseGitLog()
      //   .once('error', err => console.error('err:', err))
      //   .on('commit', commit => console.log('commit:', commit))
      //   .once('finish', () => console.log('done'));

      console.log('commits', summary);
    } catch (error) {
      console.error(error);
    }

    this.timeoutId = setTimeout(this.getLastCommits, this.period);
  }

  async getInitialSettings() {
    const {
      data: { buildCommand, period },
    } = await storageAPI.getConfig();

    this.updateSettings({ buildCommand, period });
  }

  updateSettings({ buildCommand = 'npm run build', period = 10 }) {
    this.period = period * 60 * 1000;
    this.buildCommand = buildCommand;
    this.getLastCommits();
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
