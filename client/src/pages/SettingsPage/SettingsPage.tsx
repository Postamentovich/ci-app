import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { composeU, compose } from '@bem-react/core';
import { RootState } from 'store/rootReducer';
import { settingsSlice } from 'store/settings/settingsSlice';
import { globalSlice } from 'store/global/globalSlice';
import { saveSettings, cancelChangedSettings } from 'store/settings/settingsActions';
import { Header } from 'containers/Header/Header';
import { Footer } from 'containers/Footer/Footer';
import { TextInput as TextInputPresenter } from 'components/TextInput/TextInput';
import { withTextInputHasAddon } from 'components/TextInput/_hasAddon/TexstInput_hasAddon';
import { withTextInputNotValid } from 'components/TextInput/_notValid/TextInput_notValid';
import { Button as ButtonPresenter } from 'components/Button/Button';
import { withButtonViewDefault } from 'components/Button/_view/Button_view_default';
import { withButtonSizeM } from 'components/Button/_size/Button_size_m';
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import { withButtonProgress } from 'components/Button/_progress/Button_progress';
import { Title as TitlePresenter } from 'components/Title/Title';
import { withTitleTypeH4 } from 'components/Title/_type/Title_type_h4';
import './SettingsPage.scss';

const cnSettings = cn('SettingsPage');

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  withButtonSizeM,
  withButtonTypeLink,
  withButtonProgress,
)(ButtonPresenter);

const Title = compose(withTitleTypeH4)(TitlePresenter);

const TextInput = compose(withTextInputHasAddon, withTextInputNotValid)(TextInputPresenter);

/**
 * Страница настроек
 */
export const SettingsPage = () => {
  const dispatch = useDispatch();

  const { repoName, period, buildComand, mainBranch, isSaving } = useSelector((state: RootState) => ({
    repoName: state.settingsSlice.repoName,
    period: state.settingsSlice.period,
    buildComand: state.settingsSlice.buildCommand,
    mainBranch: state.settingsSlice.mainBranch,
    isSaving: state.settingsSlice.isSaving,
  }));

  /**
   * Состояние валидности поля repoName
   */
  const [repoNameNotValid, setRepoNameNotValid] = useState(false);

  /**
   * Состояние валидности поля buildComand
   */
  const [buildComandNotValid, setBuildComandNotValid] = useState(false);

  /**
   * Обработчик поля repoName
   */
  const handleChangeRepoName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRepoNameNotValid(false);
      dispatch(settingsSlice.actions.changeRepoName(e.target.value));
    },
    [dispatch],
  );

  /**
   * Очистка поля repoName
   */
  const handleClearRepoName = useCallback(() => dispatch(settingsSlice.actions.changeRepoName('')), [
    dispatch,
  ]);

  /**
   * Обработчик поля buildComand
   */
  const handleChangeBuildCommand = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBuildComandNotValid(false);
      dispatch(settingsSlice.actions.changeBuildCommand(e.target.value));
    },
    [dispatch],
  );

  /**
   * Очистка поля buildCommand
   */
  const handleClearBuildCommand = useCallback(() => dispatch(settingsSlice.actions.changeBuildCommand('')), [
    dispatch,
  ]);

  /**
   * Обработчик поля mainBranch
   */
  const handleChangeMainBranch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(settingsSlice.actions.changeMainBranch(e.target.value));
    },
    [dispatch],
  );

  /**
   * Очистка поля mainBranch
   */
  const handleClearMainBranch = useCallback(() => dispatch(settingsSlice.actions.changeMainBranch('')), [
    dispatch,
  ]);

  /**
   * Обработчик поля period
   */
  const handleChangePeriod = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Проверяем введеное значение на число
      // @ts-ignore
      if (/\d+/.test(Number(e.target.value))) dispatch(settingsSlice.actions.changePeriod(e.target.value));
    },
    [dispatch],
  );

  /**
   * Обработчик клика на кнопку Save
   * Валидация введенных данных
   */
  const handleClickSave = useCallback(() => {
    /**
     * Проверка наличия имя репозитория
     */
    if (!repoName.length) {
      dispatch(
        globalSlice.actions.addNotify({
          message: 'Please enter GitHub repository',
          type: 'error',
          id: Date.now().valueOf(),
        }),
      );
      setRepoNameNotValid(true);
    }
    /**
     * Проверка наличия команды билда
     */
    if (!buildComand.length) {
      dispatch(
        globalSlice.actions.addNotify({
          message: 'Please enter Build command',
          type: 'error',
          id: Date.now().valueOf(),
        }),
      );
      setBuildComandNotValid(true);
    }
    /**
     * Если ошибок нет, отправляем данные
     */
    if (buildComand.length && repoName.length && !isSaving) dispatch(saveSettings());
  }, [buildComand.length, dispatch, isSaving, repoName.length]);

  /**
   * Сохранение настроек по нажатию на клавишу enter
   */
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleClickSave();
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleClickSave]);

  /**
   * Обработчик клика на кнопку Cancel
   */
  const handleClickCancel = useCallback(() => {
    if (!isSaving) dispatch(cancelChangedSettings());
  }, [dispatch, isSaving]);

  return (
    <div className={cnSettings()}>
      <Header className="Layout" title="School CI Server" />

      <div className={cnSettings('Content', ['Layout'])}>
        <Title type="h4" className={cnSettings('Title')}>
          Settings
        </Title>

        <p className={cnSettings('Description')}>
          Configure repository connection and synchronization settings.
        </p>

        <TextInput
          label="GitHub repository"
          placeholder="user-name/repo-name"
          value={repoName}
          required
          id="repoName"
          className={cnSettings('Input')}
          hasClear={!!repoName.length}
          onChange={handleChangeRepoName}
          onClearClick={handleClearRepoName}
          notValid={repoNameNotValid}
        />
        <TextInput
          label="Build command"
          placeholder="npm run build"
          value={buildComand}
          required
          id="buildComand"
          className={cnSettings('Input')}
          hasClear={!!buildComand.length}
          onChange={handleChangeBuildCommand}
          onClearClick={handleClearBuildCommand}
          notValid={buildComandNotValid}
        />
        <TextInput
          label="Main branch"
          placeholder="master"
          value={mainBranch}
          id="mainBranch"
          className={cnSettings('Input')}
          hasClear={!!mainBranch.length}
          onChange={handleChangeMainBranch}
          onClearClick={handleClearMainBranch}
        />
        <TextInput
          label="Synchronize every"
          placeholder="10"
          addonAfter="minutes"
          value={period}
          id="period"
          hasAddon
          className={cnSettings('Input')}
          onChange={handleChangePeriod}
        />

        <div className={cnSettings('Buttons')}>
          <Button
            size="m"
            view="action"
            className={cnSettings('Button')}
            onClick={handleClickSave}
            disabled={isSaving}
            progress={isSaving}
          >
            Save
          </Button>
          <Button
            size="m"
            view="default"
            className={cnSettings('Button')}
            onClick={handleClickCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </div>

      <Footer className="Layout" />
    </div>
  );
};
