import React from "react";
import axiosMock from "axios";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { compose } from "@bem-react/core";
import { render } from "enzyme";
import { fireEvent, cleanup } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SettingsPage from "../../../shared/pages/SettingsPage/SettingsPage";
import "@testing-library/jest-dom/extend-expect";

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

const testRepoName = "testRepoName";
const testPeriod = "10";
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
            buildCommand: testBuildComand,
            mainBranch: testMainBranch,
            isSaving: false,
        },
    };

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

    test("Поле buildComand должно присутствовать", () => {
        expect(inputBuildComand.length).toEqual(1);
    });

    test("В инпут buildComand попадают правильные данные из store", () => {
        expect(inputBuildComand.prop("value")).toEqual(testBuildComand);
    });

    test("Поле mainBranch должно присутствовать", () => {
        expect(inputMainBrach.length).toEqual(1);
    });

    test("В инпут mainBranch попадают правильные данные из store", () => {
        expect(inputMainBrach.prop("value")).toEqual(testMainBranch);
    });

    test("Поле period должно присутствовать", () => {
        expect(inputPeriod.length).toEqual(1);
    });

    test("В инпут period попадают правильные данные из store", () => {
        expect(inputPeriod.prop("value")).toEqual(testPeriod);
    });
});
