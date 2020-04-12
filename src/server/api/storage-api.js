/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios").default;
const https = require("https");

const api = axios.create({
    baseURL: "https://hw.shri.yandex/api/",
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const storageAPI = {
    getBuildList: (offset = 0, limit = 25) => {
        const params = new URLSearchParams();
        params.set("offset", offset);
        params.set("limit", limit);
        return api.get("build/list", { params });
    },

    getBuildLog: (buildId) => {
        const params = new URLSearchParams();
        if (buildId) params.set("buildId", buildId);
        return api.get("build/log", { params });
    },

    getBuildDetails: (buildId) => {
        const params = new URLSearchParams();
        if (buildId) params.set("buildId", buildId);
        return api.get("build/details", { params });
    },

    setBuildRequest: (model) => api.post("build/request", model),

    setBuildStart: (model) => api.post("build/start", model),

    setBuildFinish: (model) => api.post("build/finish", model),

    setBuildCancel: (model) => api.post("build/cancel", model),

    setConfig: (model) => api.post("conf", model),

    getConfig: () => api.get("conf"),

    deleteConfig: () => api.delete("conf"),
};

module.exports = { storageAPI, api };
