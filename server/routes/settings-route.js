const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const storageAPI = require('../api/storage-api');
const githubAPI = require('../api/github-api');
const gitRepo = require('../utils/git-repo');
const { hashObj } = require('../utils/hash');

const router = Router();

/**
 * Получение настроек пользователя
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data } = await storageAPI.getConfig();

    res.json(data);
  }),
);

/**
 * Сохранение настроек пользователя
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { repoName, buildCommand, mainBranch, period } = req.body;

    if (typeof repoName !== 'string') throw createError(400, 'Error in repoName');

    if (typeof buildCommand !== 'string') throw createError(400, 'Error in buildCommand');

    if (typeof mainBranch !== 'string') throw createError(400, 'Error in mainBranch');

    if (typeof period !== 'number') throw createError(400, 'Error in period');

    /** Проверка существует репозиторий или нет */
    await githubAPI.checkRepo(repoName);

    /** Обновление значений в базе */
    await storageAPI.setConfig(req.body);

    /** Очистка закэшированных значений */
    hashObj.clear();

    /** Обновление локального репозитория */
    await gitRepo.updateSettings(req.body);



    res.sendStatus(200);
  }),
);

module.exports = router;
