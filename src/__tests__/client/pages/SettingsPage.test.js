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

const testRepoName = "testRepoName";
const testPeriod = 10;
const testBuildComand = "testBuildComand";
const testMainBranch = "testMainBranch";

describe("Страница настроек", () => {
    const initialState = {
        settingsSlice: {
            repoName: testRepoName,
            period: testPeriod,
            buildComand: testBuildComand,
            mainBranch: testMainBranch,
            isSaving: false,
        },
    };

    const store = mockStore(initialState);

    const container = render(
        <Provider store={store}>
            <SettingsPage />
        </Provider>
    );

    test("В input Repo Name попадают правильные данные из store", () => {

        // expect(container.getByText(/Change/i).textContent).toBe("Change: ")

        
        // expect(container.getByText(/Change/i).textContent).not.toBe("Change: ")
        
        const inputNode = container.getByLabelText('GitHub repository');

        expect(inputNode.textContent).toBe(testRepoName)
        
        // fireEvent.change(container.getByLabelText("Input Text:"), {target: {value: 'Text' } } )

        console.log(inputNode)
        // expect(container.)
    });
});
