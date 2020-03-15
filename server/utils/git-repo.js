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

  async getLastCommits() {
    const stdOut = [];
    const stdErr = [];
    const spawned = spawn('git', [
      'log',
      ['--pretty=format:', '%H', '%ai', '%s', '%D', '%b', '%aN', '%ae'],
    ]);

    spawned.stdout.on('data', buffer => {
      stdOut.push(buffer);
    });

    spawned.stderr.on('data', buffer => {
      stdErr.push(buffer);
    });

    spawned.on('error', err => {
      stdErr.push(Buffer.from(err.stack, 'ascii'));
    });

    return new Promise((res, rej) => {
      const attemptClose = () => {
        const stdOutput = Buffer.concat(stdOut);

        const result = stdOutput.toString('utf-8');

        res(result);
      };
      spawned.on('close', attemptClose);
      spawned.on('exit', attemptClose);
    });
  }
}

const git = new GitRepo();

module.exports = git;
