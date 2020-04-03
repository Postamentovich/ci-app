import { Middleware } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from 'store/rootReducer';
import { globalSlice } from 'store/global/globalSlice';
import { buildApi } from 'api/buildApi';
import { BuildStatus } from 'api/models/models';
import * as BUILD_ACTIONS from './buildsActions';
import { bulidsSlice } from './buildsSlice';

let pollingBuildListTimeout: NodeJS.Timeout;

// eslint-disable-next-line consistent-return
const buildsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  /**
   * Отмена поллинга списка билдов
   */
  if (BUILD_ACTIONS.cancelPollingBuildList.match(action)) {
    clearTimeout(pollingBuildListTimeout);
  }

  /**
   * Получение списка билдов
   */
  if (BUILD_ACTIONS.getBuildList.match(action)) {
    try {
      dispatch(bulidsSlice.actions.setIsLoading(true));

      const list = await buildApi.getList();

      dispatch(bulidsSlice.actions.setList(list));

      dispatch(bulidsSlice.actions.setIsLoading(false));

      const itemWithWaitingStatus = list.find(
        (el) => el.status === BuildStatus.Waiting || el.status === BuildStatus.InProgress,
      );

      /**
       * Если есть билды для которых сборка еще не завершена,
       * запрашиваем список листов повторно
       */
      if (itemWithWaitingStatus) {
        clearTimeout(pollingBuildListTimeout);

        pollingBuildListTimeout = setTimeout(() => {
          dispatch(BUILD_ACTIONS.getBuildList());
        }, 10000);
      }
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
  if (BUILD_ACTIONS.getBuildLog.match(action)) {
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
  if (BUILD_ACTIONS.addBuildToQueue.match(action)) {
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

  /**
   * Получение детальной информации о билде
   */
  if (BUILD_ACTIONS.getBuildDetails.match(action)) {
    try {
      const build = await buildApi.getDetails(action.payload);

      dispatch(bulidsSlice.actions.addBuildToList(build));

      switch (build.status) {
        case BuildStatus.InProgress:
          return dispatch(
            globalSlice.actions.addNotify({
              message: 'Build in progress',
              id: Date.now().valueOf(),
              type: 'warning',
            }),
          );

        case BuildStatus.Waiting:
          return dispatch(
            globalSlice.actions.addNotify({
              message: 'Build is waiting',
              id: Date.now().valueOf(),
              type: 'warning',
            }),
          );

        default:
          dispatch(BUILD_ACTIONS.getBuildLog(build.id));
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
