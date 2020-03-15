const storageAPI = require('../api/storage-api');

class BuildAgent {
  constructor() {
    this.timer = null;

    this.command = null;

    this.timeoutId = null;

    this.getInitialSettings();
  }

  start() {}

  end() {}

  cancel() {}

  getLastCommits() {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    
  }

  async getInitialSettings() {
    const {
      data: { buildCommand, period },
    } = await storageAPI.getConfig();

    this.updateSettings({ buildCommand, period });
  }

  updateSettings({ buildCommand = 'npm run build', period = 10 }) {
    this.timer = period * 60 * 1000;
    this.command = buildCommand;
    this.getLastCommits();
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
