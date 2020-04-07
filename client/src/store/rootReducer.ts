import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import bulidsSlice from './builds/buildsSlice';
import settingsSlice from './settings/settingsSlice';
import globalSlice from './global/globalSlice';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  settingsSlice,
  globalSlice,
  bulidsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
