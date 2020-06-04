import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { storageAPI } from '../api/storage-api';
import { hashString, hashObj } from '../utils/hash';
import { BuildListResponse } from 'models/BuildListResponse';
import { QueueBuildResponse } from 'models/QueueBuildResponse';
import { BuildDetailsResponse } from 'models/BuildDetailsResponse';
import gitRepo from '../utils/git-repo';

const router = Router();

/**
 * Получение списка сборок
 */
router.get<{}, BuildListResponse>(
  '/',
  asyncHandler(async (req, res) => {
    const { offset, limit } = req.query;

    const { data } = await storageAPI.getBuildList(offset, limit);

    res.send(data);
  }),
);

/**
 * Добавление сборки в очередь
 */
router.post<{ commitHash: string }, QueueBuildResponse>(
  '/:commitHash',
  asyncHandler(async (req, res) => {
    const {
      params: { commitHash },
    } = req;

    if (typeof commitHash !== 'string') throw createError(400, 'Error in commitHash');

    const info = await gitRepo.addBuildToQueue(commitHash);

    res.send(info);
  }),
);

/**
 * Получение информации о конкретной сборке
 */
router.get<{ buildId: string }, BuildDetailsResponse>(
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
router.get<{ buildId: string }, string>(
  '/:buildId/logs',
  asyncHandler(async (req, res) => {
    const {
      params: { buildId },
    } = req;

    if (typeof buildId !== 'string') throw createError(400, 'Error in buildId');

    const hashKey = hashString(buildId);

    /** Проверка есть ли в кэше значение */
    if (hashObj.has(hashKey)) return res.json(hashObj.get(hashKey)?.data);

    const log = await storageAPI.getBuildLog(buildId);

    /** Сохранение в кэше значения */
    hashObj.set(hashKey, { data: log.data, time: Date.now().valueOf() });

    res.json(log.data);
  }),
);

export default router;
