import { createAction } from '@reduxjs/toolkit';

export const getBuildList = createAction('GET_BUILD_LIST');

export const getBuildLog = createAction<string>('GET_BUILD_LOG');
