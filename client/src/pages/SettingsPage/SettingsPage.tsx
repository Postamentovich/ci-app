import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { composeU, compose } from '@bem-react/core';
import { RootState } from 'store/rootReducer';
import { changeRepoName, changeBuildCommand, changeMainBranch, changePeriod } from 'store/settings/settingsSlice';
import { saveSettings } from 'store/settings/settingsActions';
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
import { Title as TitlePresenter } from 'components/Title/Title';
import { withTitleTypeH4 } from 'components/Title/_type/Title_type_h4';
import './SettingsPage.scss';

const cnSettings = cn('SettingsPage');

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  withButtonSizeM,
  withButtonTypeLink,
)(ButtonPresenter);

const Title = compose(withTitleTypeH4)(TitlePresenter);

const TextInput = compose(withTextInputHasAddon, withTextInputNotValid)(TextInputPresenter);

export const SettingsPage = () => {
  const dispatch = useDispatch();

  const { repoName, period, buildComand, mainBranch } = useSelector((state: RootState) => ({
    repoName: state.settingsSlice.repoName,
    period: state.settingsSlice.period,
    buildComand: state.settingsSlice.buildCommand,
    mainBranch: state.settingsSlice.mainBranch,
  }));

  const [repoNameNotValid, setRepoNameNotValid] = useState(false);

  const [buildComandNotValid, setBuildComandNotValid] = useState(false);

  /**
   * Обработчик поля repoName
   */
  const handleChangeRepoName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRepoNameNotValid(false);
      dispatch(changeRepoName(e.target.value));
    },
    [dispatch],
  );

  /**
   * Очистка поля repoName
   */
  const handleClearRepoName = useCallback(() => dispatch(changeRepoName('')), [dispatch]);

  /**
   * Обработчик поля buildComand
   */
  const handleChangeBuildCommand = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBuildComandNotValid(false);
      dispatch(changeBuildCommand(e.target.value));
    },
    [dispatch],
  );

  /**
   * Очистка поля buildCommand
   */
  const handleClearBuildCommand = useCallback(() => dispatch(changeBuildCommand('')), [dispatch]);

  /**
   * Обработчик поля mainBranch
   */
  const handleChangeMainBranch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeMainBranch(e.target.value)),
    [dispatch],
  );

  /**
   * Очистка поля mainBranch
   */
  const handleClearMainBranch = useCallback(() => dispatch(changeMainBranch('')), [dispatch]);

  /**
   * Обработчик поля period
   */
  const handleChangePeriod = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Проверяем введеное значение на число
      // @ts-ignore
      if (/\d+/.test(Number(e.target.value))) dispatch(changePeriod(e.target.value));
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
    if (!repoName.length) setRepoNameNotValid(true);
    /**
     * Проверка наличия команды билда
     */
    if (!buildComand.length) setBuildComandNotValid(true);
    /**
     * Если ошибок нет, отправляем данные
     */
    if (!buildComandNotValid && !repoNameNotValid) dispatch(saveSettings());
  }, [buildComand.length, buildComandNotValid, dispatch, repoName.length, repoNameNotValid]);

  return (
    <div className={cnSettings()}>
      <Header className="Layout" title="School CI Server" />
      <div className={cnSettings('Content', ['Layout'])}>
        <Title type="h4" className={cnSettings('Title')}>
          Settings
        </Title>
        <p className={cnSettings('Description')}>Configure repository connection and synchronization settings.</p>
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
          <Button size="m" view="action" className={cnSettings('Button')} onClick={handleClickSave}>
            Save
          </Button>
          <Button size="m" view="default" className={cnSettings('Button')} type="link" to="/">
            Cancel
          </Button>
        </div>
      </div>
      <Footer className="Layout" />
    </div>
  );
};
