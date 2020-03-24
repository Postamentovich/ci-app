import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import settingsApi from 'api/settingsApi';
import { setIsLoading } from 'store/global/globalSlice';
import { getSettings } from './settingsActions';
import { changeRepoName, changeBuildCommand, changePeriod, changeMainBranch } from './settingsSlice';

const settingsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => next => async action => {
  next(action);

  if (getSettings.match(action)) {
    try {
      dispatch(setIsLoading(true));

      const { data } = await settingsApi.getSettings();

      dispatch(setIsLoading(false));

      if (data?.repoName) dispatch(changeRepoName(data.repoName));

      if (data?.buildCommand) dispatch(changeBuildCommand(data.buildCommand));

      if (data?.period) dispatch(changePeriod(data.period));

      if (data?.mainBranch) dispatch(changeMainBranch(data.mainBranch));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  }
};

export default settingsMiddleware;
