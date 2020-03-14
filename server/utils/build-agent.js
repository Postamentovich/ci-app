const storageAPI = require('../api/storage-api');

class BuildAgent {
  constructor() {
    this.timer = null;

    this.command = null;

    this.getInitialSettings();
  }

  start() {}

  end() {}

  cancel() {}

  async getInitialSettings() {
    const {
      data: { buildCommand, period },
    } = await storageAPI.getConfig();

    this.updateSettings({ buildCommand, period });
  }

  updateSettings({ buildCommand, period }) {
    this.timer = period;
    this.command = buildCommand;
  }
}

const buildAgent = new BuildAgent();

module.exports = buildAgent;
