import { combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './settings/settingsSlice';
import globalSlice from './global/globalSlice';

const rootReducer = combineReducers({ settingsSlice, globalSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
