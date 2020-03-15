const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');

class GitRepo {
  constructor() {
    this.runQueue = [];

    this.localName = 'repo';
  }

  /**
   * Проверка существует репозиторий локально или нет
   */
  get localRepoIsExist() {
    try {
      const stat = fs.statSync(`${this.localName}`);
      return stat.isDirectory();
    } catch (error) {
      return false;
    }
  }

  /**
   * Запускает выполнение комманды
   * @param {*} command
   */
  async run(command) {
    return exec(command);
  }

  /**
   * Клонирует репозиторий
   * @param {*} repoName
   */
  async clone(repoName) {
    await this.removeLocalRepo();
    const command = `git clone https://github.com/${repoName} ${this.localName}`;
    return this.run(command);
  }

  /**
   * Удаляет локальный репозиторий
   */
  removeLocalRepo() {
    if (this.localRepoIsExist) {
      const command = `rm -rf ${this.localName}`;
      return this.run(command);
    }
    return null;
  }

  /**
   * Переключается на нужную ветку
   * @param {*} mainBranch
   */
  checkout(mainBranch) {
    const command = `cd ${this.localName} && git checkout ${mainBranch}`;
    return this.run(command);
  }

  checkIsRepo() {
    // function handler(err, isRepo) {
    //   then && then(err, String(isRepo).trim() === 'true');
    // }
    // const command = [];
    // return this.run(['rev-parse', '--is-inside-work-tree'], handler);
  }
}

const git = new GitRepo();

module.exports = git;
