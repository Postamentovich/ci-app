import * as express from "express";
import { createStore } from "../../shared/store";
import { initialState as initialGlobalSlice } from "../../shared/store/global/globalSlice";
import { initialState as initialSettingsSlice } from "../../shared/store/settings/settingsSlice";
const storageApi = require("../api/storage-api");

const addStore = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    let initialState = {};

    try {
        const { data } = await storageApi.getConfig();

        if (data) {
            initialState = {
                settingsSlice: {
                    ...initialSettingsSlice,
                    repoName: data.data.repoName,
                    buildCommand: data.data.buildCommand,
                    mainBranch: data.data.mainBranch,
                    period: data.data.period,
                },
                globalSlice: {
                    ...initialGlobalSlice,
                    isLoading: false,
                },
            };
        }
    } catch (error) {
        console.error(error);
    }

    const store = createStore({ preloadedState: initialState });

    res.locals.store = store;

    next();
};

export default addStore;
