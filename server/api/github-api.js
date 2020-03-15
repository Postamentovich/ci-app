const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://github.com/',
});

const githubAPI = {
  checkRepo: repoName => api.get(repoName),
};

module.exports = githubAPI;
