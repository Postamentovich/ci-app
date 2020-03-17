const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const storageAPI = require('../api/storage-api');
const githubAPI = require('../api/github-api');
const gitRepo = require('../utils/git-repo');

const router = Router();

/**
 * Получение сохраненных настроек
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data } = await storageAPI.getConfig();

    res.json(data);
  }),
);

/**
 * Сохранение настроек
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

    await storageAPI.setConfig(req.body);

    gitRepo.addSettingsToQueue(req.body);

    res.sendStatus(200);
  }),
);

module.exports = router;
