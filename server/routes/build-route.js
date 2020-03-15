const { Router } = require('express');
const storageAPI = require('../api/storage-api');

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
router.post('/:commitHash', (req, res) => {
  const {
    params: { commitHash },
  } = req;

  console.log(commitHash);

  res.sendStatus(200);
});

/**
 * Получение информации о конкретной сборке
 */
router.get('/:buildId', (req, res) => {
  const {
    params: { buildId },
  } = req;

  console.log(buildId);

  res.sendStatus(200);
});

/**
 * Получение логов билда (сплошной текст)
 */
router.get('/:buildId/logs', (req, res) => {
  const {
    params: { buildId },
  } = req;

  console.log(buildId);

  res.sendStatus(200);
});

module.exports = router;
