import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import { history } from "../shared/store/rootReducer";
import { createStore } from "../shared/store";
import App from "../shared/App";
import createHistory from "../shared/store/history";

export const history = createHistory();

const store =
    window.store ||
    createStore({
        preloadedState: window.__PRELOADED_STATE__,
    });

hydrate(
    <Provider store={store}>
        <Router history={history}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </Router>
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
