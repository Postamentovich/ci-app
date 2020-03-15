const { Router } = require('express');
const storageAPI = require('../api/storage-api');
const buildAgent = require('../utils/build-agent');

const router = Router();

/**
 * Получение списка сборок
 */
router.get('/', async (req, res) => {
  try {
    const { data } = await storageAPI.getBuildList();

    res.send(data);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

/**
 * Добавление сборки в очередь
 */
router.post('/:commitHash', async (req, res) => {
  const {
    params: { commitHash },
  } = req;

  try {
    await buildAgent.addToQueue(commitHash);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(415);
  }
});

/**
 * Получение информации о конкретной сборке
 */
router.get('/:buildId', async (req, res) => {
  const {
    params: { buildId },
  } = req;

  try {
    const { data } = await storageAPI.getBuildDetails(buildId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(415);
  }
});

/**
 * Получение логов билда (сплошной текст)
 */
router.get('/:buildId/logs', async (req, res) => {
  const {
    params: { buildId },
  } = req;

  try {
    const { data } = await storageAPI.getBuildLog(buildId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(415);
  }
});

module.exports = router;
