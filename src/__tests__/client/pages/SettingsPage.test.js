import React from "react";
import axiosMock from "axios";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { compose } from "@bem-react/core";
import { render, mount } from "enzyme";
import { fireEvent, cleanup } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SettingsPage from "../../../shared/pages/SettingsPage/SettingsPage";
import "@testing-library/jest-dom/extend-expect";
import { settingsSlice } from "../../../shared/store/settings/settingsSlice";

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
    store.dispatch = jest.fn(() => {});

    beforeEach(() => {
        container = mount(
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
        expect(inputRepoName.at(0).length).toEqual(1);
    });

    test("В инпут repoName попадают правильные данные из store", () => {
        expect(inputRepoName.at(0).prop("value")).toEqual(testRepoName);
    });

    test("Поле buildComand должно присутствовать", () => {
        expect(inputBuildComand.at(0).length).toEqual(1);
    });

    test("В инпут buildComand попадают правильные данные из store", () => {
        expect(inputBuildComand.at(0).prop("value")).toEqual(testBuildComand);
    });

    test("Поле mainBranch должно присутствовать", () => {
        expect(inputMainBrach.at(0).length).toEqual(1);
    });

    test("В инпут mainBranch попадают правильные данные из store", () => {
        expect(inputMainBrach.at(0).prop("value")).toEqual(testMainBranch);
    });

    test("Поле period должно присутствовать", () => {
        expect(inputPeriod.at(0).length).toEqual(1);
    });

    test("В инпут period попадают правильные данные из store", () => {
        expect(inputPeriod.at(0).prop("value")).toEqual(testPeriod);
    });

    test("Поле repoName изменяется", () => {
        inputRepoName.at(3).simulate("change", { target: { name: "repoName", value: "testRepo" } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: settingsSlice.actions.changeRepoName.type,
            payload: "testRepo",
        });
    });

    test("Поле buildComand изменяется", () => {
        inputBuildComand
            .at(3)
            .simulate("change", { target: { name: "buildComand", value: "testBuild" } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: settingsSlice.actions.changeBuildCommand.type,
            payload: "testBuild",
        });
    });

    test("Поле mainBranch изменяется", () => {
        inputMainBrach
            .at(3)
            .simulate("change", { target: { name: "mainBranch", value: "testBranch" } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: settingsSlice.actions.changeMainBranch.type,
            payload: "testBranch",
        });
    });

    test("Поле period изменяется", () => {
        inputPeriod
            .at(3)
            .simulate("change", { target: { name: "mainBranch", value: 15 } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: settingsSlice.actions.changePeriod.type,
            payload: 15,
        });
    });
});
