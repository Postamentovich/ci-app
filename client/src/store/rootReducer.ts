import { combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './settings/settingsSlice';

const rootReducer = combineReducers({ settingsSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
