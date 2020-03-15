const storageAPI = require('../api/storage-api');
const buildAgent = require('./build-agent');
const git = require('./git-repo');

let currentSettings;

async function cloneRepo({ repoName, buildCommand, mainBranch, period }) {
  if (!currentSettings) {
    const { data } = await storageAPI.getConfig();

    currentSettings = data;
  }

  if (currentSettings.repoName !== repoName || !git.localRepoIsExist) {
    await git.clone(repoName);

    await git.checkout(mainBranch);
  } else if (currentSettings.mainBranch !== mainBranch) {
    await git.checkout(mainBranch);
  }

  buildAgent.updateSettings({ buildCommand, period, mainBranch });

  currentSettings = { repoName, buildCommand, mainBranch, period };
}

module.exports = cloneRepo;
