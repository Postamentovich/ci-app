import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import buildApi from 'api/buildApi';
import { getBuildList, getBuildLog } from './buildsActions';
import { bulidsSlice } from './buildsSlice';
// import { logString } from './log-util';

const buildsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => next => async action => {
  next(action);

  if (getBuildList.match(action)) {
    dispatch(bulidsSlice.actions.setIsLoading(true));

    const list = await buildApi.getList();

    dispatch(bulidsSlice.actions.setList(list));

    dispatch(bulidsSlice.actions.setIsLoading(false));
  }

  if (getBuildLog.match(action)) {
    dispatch(bulidsSlice.actions.setIsLogLoading(true));

    const log = await buildApi.getLog(action.payload);

    dispatch(bulidsSlice.actions.setLog({ id: action.payload, log }));

    dispatch(bulidsSlice.actions.setIsLogLoading(false));
  }
};

export default buildsMiddleware;
