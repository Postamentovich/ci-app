/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import * as express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import App from "../../shared/App";
import Html from "../components/HTML";
const { storageAPI } = require("../api/storage-api");
import { createStore } from "../../shared/store";
import { initialState as initialGlobalSlice } from "../../shared/store/global/globalSlice";
import { initialState as initialSettingsSlice } from "../../shared/store/settings/settingsSlice";

const serverRenderer: any = () => async (
    req: express.Request & { store: Store },
    res: express.Response
) => {
    let initialState = {};

    try {
        const { data } = await storageAPI.getConfig();

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

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
    );

    const state = JSON.stringify(store.getState());

    return res.send(
        "<!doctype html>" +
            renderToString(
                <Html
                    css={[res.locals.assetPath("bundle.css"), res.locals.assetPath("vendor.css")]}
                    scripts={[res.locals.assetPath("bundle.js"), res.locals.assetPath("vendor.js")]}
                    state={state}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
