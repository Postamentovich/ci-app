import { Middleware } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from 'store/rootReducer';
import settingsApi from 'api/settingsApi';
import { globalSlice } from 'store/global/globalSlice';
import { ConfigurationInput, ConfigurationModel } from 'api/models/models';
import { getSettings, saveSettings, cancelChangedSettings } from './settingsActions';
import { settingsSlice } from './settingsSlice';

let currentSettings: ConfigurationModel;

const settingsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  /**
   * Получение настроек пользователя
   */
  if (getSettings.match(action)) {
    try {
      dispatch(globalSlice.actions.setIsLoading(true));

      const { data } = await settingsApi.getSettings();

      dispatch(globalSlice.actions.setIsLoading(false));

      if (data) {
        currentSettings = data;

        dispatch(settingsSlice.actions.setInitialSettings(data));
      }
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));
    }
  }

  /**
   * Отмена введенных пользователем значений
   */
  if (cancelChangedSettings.match(action)) {
    if (currentSettings) dispatch(settingsSlice.actions.setInitialSettings(currentSettings));

    dispatch(push('/'));
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
       * Выставляем дефолтные значения, если они не были указаны.
       * Поля repoName и buildCommand валидируются при отправке формы.
       */
      const model: ConfigurationInput = {
        repoName,
        buildCommand,
        mainBranch: mainBranch.length > 0 ? mainBranch : 'master',
        period: period > 0 ? period : 10,
      };

      await settingsApi.saveSettings(model);

      dispatch(settingsSlice.actions.setIsSaving(false));

      dispatch(push('/'));
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Some error with saving repository',
          id: Date.now().valueOf(),
        }),
      );
    }
  }
};

export default settingsMiddleware;
