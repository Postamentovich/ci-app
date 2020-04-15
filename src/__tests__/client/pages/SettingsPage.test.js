import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import SettingsPage from "../../../shared/pages/SettingsPage/SettingsPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as ReactReduxHooks from "../../../__mocks__/react-redux-hooks";
import { shallow, render, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { compose } from "@bem-react/core";

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

const testRepoName = "testRepoName";
const testPeriod = 10;
const testBuildComand = "testBuildComand";
const testMainBranch = "testMainBranch";

describe("Страница настроек", () => {
    let container;
    let inputRepoName;
    let inputBuildComand;
    let inputMainBrach;
    let inputPeriod;
    let saveButton;
    let cancelButton;

    const initialState = {
        settingsSlice: {
            repoName: testRepoName,
            period: testPeriod,
            buildComand: testBuildComand,
            mainBranch: testMainBranch,
            isSaving: false,
        },
    };

    describe("Проверка обработки данных", () => {
        const store = mockStore(initialState);

        beforeEach(() => {
            container = render(
                <Provider store={store}>
                    <SettingsPage />
                </Provider>
            );
            inputRepoName = container.find("#repoName");
            inputBuildComand = container.find("#buildComand");
            inputMainBrach = container.find("#mainBranch");
            inputPeriod = container.find("#period");
            saveButton = container.find("#buttonSave");
            cancelButton = container.find("#buttonCancel");
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test("Поле repoName должно присутствовать", () => {
            expect(inputRepoName.length).toEqual(1);
        });

        test("В инпут repoName попадают правильные данные из store", () => {
            expect(inputRepoName.prop("value")).toEqual(testRepoName);
        });
    });
});
