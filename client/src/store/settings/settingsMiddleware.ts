import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import settingsApi from 'api/settingsApi';
import { setIsLoading } from 'store/global/globalSlice';
import { ConfigurationInput } from 'api/models/models';
import { getSettings, saveSettings } from './settingsActions';
import { settingsSlice } from './settingsSlice';

const settingsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => next => async action => {
  next(action);

  /**
   * Получение настроек пользователя
   */
  if (getSettings.match(action)) {
    try {
      dispatch(setIsLoading(true));

      const { data } = await settingsApi.getSettings();

      dispatch(setIsLoading(false));

      if (data) dispatch(settingsSlice.actions.setInitialSettings(data));

      // if (data?.repoName) dispatch(settingsSlice.actions.changeRepoName(data.repoName));

      // if (data?.buildCommand) dispatch(settingsSlice.actions.changeBuildCommand(data.buildCommand));

      // if (data?.period) dispatch(settingsSlice.actions.changePeriod(data.period));

      // if (data?.mainBranch) dispatch(settingsSlice.actions.changeMainBranch(data.mainBranch));
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));
    }
  }
  /**
   * Сохранение настроек пользователя
   */
  if (saveSettings.match(action)) {
    try {
      dispatch(settingsSlice.actions.setIsSaving(true));

      const {
        settingsSlice: { repoName, buildCommand, mainBranch, period },
      }: RootState = getState();

      /**
       * Выставляем дефолтные значения, если они не были заняты.
       * Поля repoName и buildCommand валидируются при отправке формы.
       */
      const model: ConfigurationInput = {
        repoName,
        buildCommand,
        mainBranch: mainBranch.length > 0 ? mainBranch : 'master',
        period: period > 0 ? period : 10,
      };

      await settingsApi.saveSettings(model);

      window.location.replace('/');

      dispatch(settingsSlice.actions.setIsSaving(false));
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));
    }
  }
};

export default settingsMiddleware;
