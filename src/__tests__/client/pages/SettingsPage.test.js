import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import SettingsPage from "../../../shared/pages/SettingsPage/SettingsPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("axios");

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Страница настроек", () => {
    const initialState = {
        settingsSlice: {
            repoName: "state.settingsSlice.repoName",
            period: 10,
            buildComand: "state.settingsSlice.buildCommand",
            mainBranch: "state.settingsSlice.mainBranch",
            isSaving: false,
        },
    };

    const store = mockStore(initialState);

    render(
        <Provider store={store}>
            <SettingsPage />
        </Provider>
    );

    test("sadas", () => {});
});
