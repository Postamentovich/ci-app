import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createStore } from "../shared/store";
import createHistory from "../shared/store/history";
import App from "../shared/App";

export const history = createHistory();

const store =
    window.store ||
    createStore({
        preloadedState: window.__PRELOADED_STATE__,
    });

hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
