import { Middleware } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from 'store/rootReducer';
import { globalSlice } from 'store/global/globalSlice';
import { buildApi } from 'api/buildApi';
import { getBuildList, getBuildLog, addBuildToQueue, getBuildDetails } from './buildsActions';
import { bulidsSlice } from './buildsSlice';

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

      const itewWithWaitingStatus = list.find(el => el.status === 'Waiting' || el.status === 'InProgress');

      if (itewWithWaitingStatus) setTimeout(() => dispatch(getBuildList()), 5000);
    } catch (error) {
      dispatch(bulidsSlice.actions.setIsLoading(false));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Error getting list of builds',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
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

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Error getting log',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
    }
  }

  /**
   * Добавление билда в очередь
   */
  if (addBuildToQueue.match(action)) {
    try {
      const build = await buildApi.addBuild(action.payload);
      dispatch(bulidsSlice.actions.addBuildToList(build));

      dispatch(push(`/build/${build.id}`));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Build successfully added',
          id: Date.now().valueOf(),
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        globalSlice.actions.addNotify({
          message: 'Error adding build to queue',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
    }
  }

  if (getBuildDetails.match(action)) {
    try {
      const build = await buildApi.getDetails(action.payload);

      dispatch(bulidsSlice.actions.addBuildToList(build));

      if (build.status === 'InProgress') {
        dispatch(
          globalSlice.actions.addNotify({
            message: 'Build in progress',
            id: Date.now().valueOf(),
            type: 'warning',
          }),
        );
      } else if (build.status === 'Waiting') {
        dispatch(
          globalSlice.actions.addNotify({
            message: 'Build is waiting',
            id: Date.now().valueOf(),
            type: 'warning',
          }),
        );
      } else {
        dispatch(getBuildLog(build.id));
      }
    } catch (error) {
      dispatch(
        globalSlice.actions.addNotify({
          message: 'Error getting build details',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
    }
  }
};

export default buildsMiddleware;
