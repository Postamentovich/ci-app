const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

class GitRepo {
  constructor() {
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

  /**
   * Возвращает последний коммит
   */
  async getLastCommit() {
    if (this.localRepoIsExist) {
      await this.run(`cd ${this.localName} && git pull`);

      const { stdout } = await this.run(
        `cd ${this.localName} && git log -1 --pretty=format:"%H %s %an"`
      );

      const commit = stdout.split(' ');

      const [commitHash, commitMessage, authorName] = commit;

      return {
        commitHash,
        commitMessage,
        authorName,
      };
    }

    return Promise.reject();
  }
}

const git = new GitRepo();

module.exports = git;
