/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { storageAPI } from '../api/storage-api';
import gitRepo from '../utils/git-repo';
import { hashObj } from '../utils/hash';
import { UserSettingsResponse } from 'models/UserSettingsResponse';
import { UserSettings } from 'models/UserSettings';

const router = Router();

/**
 * Получение настроек пользователя
 */
router.get<{}, UserSettingsResponse>(
  '/',
  asyncHandler(async (req, res) => {
    const { data } = await storageAPI.getConfig();

    res.json(data);
  }),
);

/**
 * Сохранение настроек пользователя
 */
router.post<{}, any, UserSettings>(
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

export default router;
