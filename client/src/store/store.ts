/* eslint-disable global-require */
import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import rootReducer, { history } from './rootReducer';
import settingsMiddleware from './settings/settingsMiddleware';
import buildsMiddleware from './builds/buildsMiddleware';
import { getSettings } from './settings/settingsActions';

const store = configureStore({
  reducer: rootReducer,
  middleware: [settingsMiddleware, buildsMiddleware, routerMiddleware(history)],
});

store.dispatch(getSettings());

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
