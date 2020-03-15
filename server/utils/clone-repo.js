const util = require('util');
const exec = util.promisify(require('child_process').exec);
const storageAPI = require('../api/storage-api');

let currentSettings;

async function cloneRepo({ repoName, buildCommand, mainBranch, period }) {
  if (!currentSettings) {
    const { data } = await storageAPI.getConfig();

    currentSettings = data;
  }

  if (currentSettings.repoName !== repoName) {
    await exec('rm -rf repo');

    await exec(`git clone https://github.com/${repoName} repo`);

    await exec(`cd repo && git checkout ${mainBranch}`);
  } else if (currentSettings.mainBranch !== mainBranch) {
    await exec(`cd repo && git checkout ${mainBranch}`);
  }

  currentSettings = { repoName, buildCommand, mainBranch, period };
}

module.exports = cloneRepo;
