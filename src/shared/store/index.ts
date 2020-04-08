import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./rootReducer";
import settingsMiddleware from "./settings/settingsMiddleware";
import buildsMiddleware from "./builds/buildsMiddleware";
import createUniversalHistory from "./history";

type StoreParams = {
    preloadedState?: { [key: string]: any };
};

const history = createUniversalHistory();

export const createStore = ({ preloadedState }: StoreParams) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: [settingsMiddleware, buildsMiddleware, routerMiddleware(history)],
    });

    if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
            module.hot.accept("./rootReducer", () =>
                store.replaceReducer(require("./rootReducer").default)
            );
        }
    }

    return store;
};

export default createStore;
