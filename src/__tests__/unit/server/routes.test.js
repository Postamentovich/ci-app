const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const request = require("supertest");
const https = require("https");
const gitRepo = require("../../../server/utils/git-repo");
const buildAgent = require("../../../server/utils/build-agent");
import app from "../../../server";
const { api } = require("../../../server/api/storage-api");
import {
    mockBuildListResponse,
    mockAddBuildResponse,
    mockConfigRequest,
    mockConfigResponse,
    mockBuildDetailsResponse,
    mockLogResponse,
} from "../../../__mocks__/mocks-routes";

const mock = new MockAdapter(api);

mock.onGet("conf").reply(200, mockConfigResponse);

mock.onPost("conf").reply(200);

mock.onGet("build/list").reply(200, mockBuildListResponse);

mock.onPost("build/request").reply(200, mockAddBuildResponse);

const buildDetailsParams = new URLSearchParams().set("buildId", "123");

mock.onGet("build/details", { params: buildDetailsParams }).reply(200, mockAddBuildResponse);

mock.onGet("build/log", { params: buildDetailsParams }).reply(200, mockLogResponse);

gitRepo.getInitialSettings = jest.fn(() => true);

buildAgent.getItems = jest.fn(() => true);

describe("Эндпоинты", () => {
    describe("/api/builds/:buildId - GET", () => {
        test("Возвращается правильное значение", async () => {
            gitRepo.addBuildToQueue = jest.fn(() => mockAddBuildResponse);
            const res = await request(app).get("/api/builds/123");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockAddBuildResponse);
        });
    });

    describe("/api/builds/:commitHash - POST", () => {
        test("Возвращается правильное значение", async () => {
            gitRepo.addBuildToQueue = jest.fn(() => mockAddBuildResponse);
            const res = await request(app).post("/api/builds/123");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockAddBuildResponse);
        });
    });

    describe("/api/builds - GET", () => {
        test("Возвращается правильное значение", async () => {
            const res = await request(app).get("/api/builds");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockBuildListResponse);
        });
    });

    describe("/api/settings - GET", () => {
        test("Возвращается правильное значение", async () => {
            const res = await request(app).get("/api/settings");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockConfigResponse);
        });
    });

    describe("/api/settings - POST", () => {
        test("При невалидном поле repoName - api отдает 400 ошибку", async () => {
            const res = await request(app).post("/api/settings").send({
                buildCommand: "yarn dev",
                mainBranch: "master",
                period: 10,
            });
            expect(res.status).toBe(400);
        });
        test("При невалидном поле buildCommand - api отдает 400 ошибку", async () => {
            const res = await request(app).post("/api/settings").send({
                repoName: "Postamentovich/chat",
                mainBranch: "master",
                period: 10,
            });
            expect(res.status).toBe(400);
        });
        test("При невалидном поле mainBranch - api отдает 400 ошибку", async () => {
            const res = await request(app).post("/api/settings").send({
                repoName: "Postamentovich/chat",
                buildCommand: "yarn dev",
                period: 10,
            });
            expect(res.status).toBe(400);
        });
        test("Если все поля валидные - api отдает 200", async () => {
            gitRepo.updateSettings = jest.fn(() => true);

            const res = await request(app).post("/api/settings").send({
                repoName: "Postamentovich/chat",
                buildCommand: "yarn dev",
                mainBranch: "master",
                period: 10,
            });
            expect(res.status).toBe(200);
        });
    });
});
