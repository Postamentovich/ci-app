import { Middleware } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../rootReducer';
import { globalSlice } from '../global/globalSlice';
import { bulidsSlice } from '../builds/buildsSlice';
import { settingsApi } from '../../api/settingsApi';
import { getSettings, saveSettings, cancelChangedSettings } from './settingsActions';
import { settingsSlice } from './settingsSlice';
import { UserSettings } from 'models/UserSettings';

let currentSettings: UserSettings;

const settingsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => (next) => async (
  action,
) => {
  next(action);

  /**
   * Получение настроек пользователя
   */
  if (getSettings.match(action)) {
    try {
      dispatch(globalSlice.actions.setIsLoading(true));

      const { data } = await settingsApi.getSettings();

      if (data) {
        currentSettings = data;

        dispatch(settingsSlice.actions.setInitialSettings(data));
      }

      dispatch(globalSlice.actions.setIsLoading(false));
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Error while getting user settings',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
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
      const model: UserSettings = {
        repoName,
        buildCommand,
        mainBranch: mainBranch.length > 0 ? mainBranch : 'master',
        period: period > 0 ? period : 10,
      };

      await settingsApi.saveSettings(model);

      dispatch(bulidsSlice.actions.resetList());

      dispatch(bulidsSlice.actions.setPage(1));

      currentSettings = model;

      dispatch(settingsSlice.actions.setIsSaving(false));

      dispatch(push('/'));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Settings saved successfully',
          id: Date.now().valueOf(),
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(settingsSlice.actions.setIsSaving(false));

      dispatch(
        globalSlice.actions.addNotify({
          message: 'Some error with saving repository',
          id: Date.now().valueOf(),
          type: 'error',
        }),
      );
    }
  }
};

export default settingsMiddleware;
