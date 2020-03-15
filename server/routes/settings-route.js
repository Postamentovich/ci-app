const { Router } = require('express');
const storageAPI = require('../api/storage-api');
const githubAPI = require('../api/github-api');
const cloneRepo = require('../utils/clone-repo');

const router = Router();

/**
 * Получение сохраненных настроек
 */
router.get('/', async (req, res) => {
  try {
    const { data } = await storageAPI.getConfig();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

/**
 * Сохранение настроек
 */
router.post('/', async (req, res) => {
  try {
    await githubAPI.checkRepo(req.body.repoName);

    cloneRepo(req.body);

    await storageAPI.setConfig(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

module.exports = router;
