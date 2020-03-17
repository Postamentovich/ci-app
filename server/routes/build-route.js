const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const storageAPI = require('../api/storage-api');
const gitRepo = require('../utils/git-repo');

const router = Router();

/**
 * Получение списка сборок
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data } = await storageAPI.getBuildList();

    res.send(data);
  }),
);

/**
 * Добавление сборки в очередь
 */
router.post(
  '/:commitHash',
  asyncHandler(async (req, res) => {
    const {
      params: { commitHash },
    } = req;

    if (typeof commitHash !== 'string') throw createError(400, 'Error in commitHash');

    await gitRepo.getInfoByHash(commitHash);

    res.sendStatus(200);
  }),
);

/**
 * Получение информации о конкретной сборке
 */
router.get(
  '/:buildId',
  asyncHandler(async (req, res) => {
    const {
      params: { buildId },
    } = req;

    if (typeof buildId !== 'string') throw createError(400, 'Error in buildId');

    const { data } = await storageAPI.getBuildDetails(buildId);

    res.json(data);
  }),
);

/**
 * Получение логов билда (сплошной текст)
 */
router.get(
  '/:buildId/logs',
  asyncHandler(async (req, res) => {
    const {
      params: { buildId },
    } = req;

    if (typeof buildId !== 'string') throw createError(400, 'Error in buildId');

    const { data } = await storageAPI.getBuildLog(buildId);

    res.json(data);
  }),
);

module.exports = router;
