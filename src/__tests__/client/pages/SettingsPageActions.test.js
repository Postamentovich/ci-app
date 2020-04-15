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

// jest.mock("react-redux", );

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

    describe("Обработка данных", () => {
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

        afterEach(cleanup);

        it("Поле repoName изменяется", () => {
            fireEvent.change(inputRepoName, { target: { value: "James" } });

            expect(store.dispatch).toHaveBeenCalledWith({
                type: "test",
            });
        });
    });
});
