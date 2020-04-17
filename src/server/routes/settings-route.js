/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const {storageAPI} = require('../api/storage-api');
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
    const { repoName, buildCommand, mainBranch } = req.body;
    
    if (typeof repoName !== 'string') throw createError(400, 'Error in repoName');

    if (typeof buildCommand !== 'string') throw createError(400, 'Error in buildCommand');

    if (typeof mainBranch !== 'string') throw createError(400, 'Error in mainBranch');

    /** Очистка закэшированных значений */
    hashObj.clear();

    /** Обновление локального репозитория */
    await gitRepo.updateSettings(req.body);

    res.sendStatus(200);
  }),
);

module.exports = router;
