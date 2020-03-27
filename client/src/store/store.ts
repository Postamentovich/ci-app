/* eslint-disable global-require */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import settingsMiddleware from './settings/settingsMiddleware';
import buildsMiddleware from './builds/buildsMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [settingsMiddleware, buildsMiddleware],
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
