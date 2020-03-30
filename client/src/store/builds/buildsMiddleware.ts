import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import buildApi from 'api/buildApi';
import { getBuildList, getBuildLog, addBuildToQueue } from './buildsActions';
import { bulidsSlice } from './buildsSlice';
import { globalSlice } from 'store/global/globalSlice';
import { push } from 'connected-react-router';

const buildsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => next => async action => {
  next(action);

  /**
   * Получение списка билдов
   */
  if (getBuildList.match(action)) {
    try {
      dispatch(bulidsSlice.actions.setIsLoading(true));

      const list = await buildApi.getList();

      dispatch(bulidsSlice.actions.setList(list));

      dispatch(bulidsSlice.actions.setIsLoading(false));
    } catch (error) {
      dispatch(bulidsSlice.actions.setIsLoading(false));
    }
  }

  /**
   * Получение лога
   */
  if (getBuildLog.match(action)) {
    try {
      dispatch(bulidsSlice.actions.setIsLogLoading(true));

      const log = await buildApi.getLog(action.payload);

      dispatch(bulidsSlice.actions.setLog({ id: action.payload, log }));

      dispatch(bulidsSlice.actions.setIsLogLoading(false));
    } catch (error) {
      dispatch(bulidsSlice.actions.setIsLogLoading(false));
    }
  }

  if (addBuildToQueue.match(action)) {
    try {
      await buildApi.addBuild(action.payload);

      dispatch(push('/'));
    } catch (error) {
      dispatch(
        globalSlice.actions.addNotify({ id: Date.now().valueOf(), message: 'Something went wrong...' }),
      );
    }
  }
};

export default buildsMiddleware;
