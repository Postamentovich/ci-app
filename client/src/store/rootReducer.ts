import { combineReducers } from '@reduxjs/toolkit';
import bulidsSlice from './builds/buildsSlice';
import settingsSlice from './settings/settingsSlice';
import globalSlice from './global/globalSlice';

const rootReducer = combineReducers({ settingsSlice, globalSlice, bulidsSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
