const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { storageAPI } = require("../api/storage-api");
const gitRepo = require("../utils/git-repo");
const { hashString, hashObj } = require("../utils/hash");
const buiildAgent = require("../utils/build-agent");

const router = Router();

/**
 * Получение списка сборок
 */
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const { offset, limit } = req.query;

        const { data } = await storageAPI.getBuildList(offset, limit);

        res.send(data);
    })
);

/**
 * Добавление сборки в очередь
 */
router.post(
    "/:commitHash",
    asyncHandler(async (req, res) => {
        const {
            params: { commitHash },
        } = req;

        console.log("commitHash", commitHash);

        if (typeof commitHash !== "string") throw createError(400, "Error in commitHash");

        const info = await gitRepo.addBuildToQueue(commitHash);

        res.send(info);
    })
);

/**
 * Получение информации о конкретной сборке
 */
router.get(
    "/:buildId",
    asyncHandler(async (req, res) => {
        const {
            params: { buildId },
        } = req;

        if (typeof buildId !== "string") throw createError(400, "Error in buildId");

        const { data } = await storageAPI.getBuildDetails(buildId);

        res.json(data);
    })
);

/**
 * Получение логов билда (сплошной текст)
 */
router.get(
    "/:buildId/logs",
    asyncHandler(async (req, res) => {
        const {
            params: { buildId },
        } = req;

        if (typeof buildId !== "string") throw createError(400, "Error in buildId");

        /** Получение детальной информации о билде */
        const {
            data: {
                data: { commitHash },
            },
        } = await storageAPI.getBuildDetails(buildId);

        const hashKey = hashString(buildId, commitHash);

        /** Проверка есть ли в кэше значение */
        if (hashObj.has(hashKey)) return res.json(hashObj.get(hashKey).data);

        const log = await storageAPI.getBuildLog(buildId);

        /** Сохранение в кэше значения */
        hashObj.set(hashKey, { data: log.data, time: Date.now().valueOf() });

        res.json(log.data);
    })
);

module.exports = router;
