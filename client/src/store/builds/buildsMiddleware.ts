import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import buildApi from 'api/buildApi';
import { getBuildList } from './buildsActions';
import { bulidsSlice } from './buildsSlice';

const buildsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => next => async action => {
  next(action);

  if (getBuildList.match(action)) {
    dispatch(bulidsSlice.actions.setIsLoading(true));

    const list = await buildApi.getList();

    dispatch(bulidsSlice.actions.setList(list));

    dispatch(bulidsSlice.actions.setIsLoading(false));
  }
};

export default buildsMiddleware;
