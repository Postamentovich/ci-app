const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const request = require("supertest");
const https = require("https");
import app from "../../server";
const { api } = require("../../server/api/storage-api");

const mock = new MockAdapter(api);

const mockConfigResponse = {
    data: {
        id: "0e0fb177-b23e-48ed-94d0-a46474edd8de",
        repoName: "Postamentovich/chat",
        buildCommand: "yarn dev",
        mainBranch: "master",
        period: 10,
    },
};

const mockConfigRequest = {
    repoName: "Postamentovich/chat",
    buildCommand: "yarn dev",
    mainBranch: "master",
    period: 10,
};

mock.onGet("conf").reply(200, mockConfigResponse);
mock.onPost("conf").reply(200);

describe("Тестирование эндпоинтов", () => {
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
        // test("Если все поля валидные - api отдает 200", async () => {
        //     const res = await request(app).post("/api/settings").send({
        //         repoName: "Postamentovich/chat",
        //         buildCommand: "yarn dev",
        //         mainBranch: "master",
        //         period: 10,
        //     });
        //     expect(res.status).toBe(200);
        // });
    });
});
