import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import settingsApi from 'api/settingsApi';
import { setIsLoading } from 'store/global/globalSlice';
import { ConfigurationInput } from 'api/models/models';
import { getSettings, saveSettings } from './settingsActions';
import { changeRepoName, changeBuildCommand, changePeriod, changeMainBranch, setIsSaving } from './settingsSlice';

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
      dispatch(setIsSaving(false));
    }
  }

  if (saveSettings.match(action)) {
    try {
      dispatch(setIsSaving(true));

      const state: RootState = getState();

      const model: ConfigurationInput = {
        repoName: state.settingsSlice.repoName || '',
        buildCommand: state.settingsSlice.buildCommand || '',
        mainBranch: state.settingsSlice.mainBranch || '',
        period: state.settingsSlice.period || 10,
      };

      await settingsApi.saveSettings(model);

      dispatch(setIsSaving(false));
    } catch (error) {
      dispatch(setIsSaving(false));
    }
  }
};

export default settingsMiddleware;
