import React from 'react';
import { cn } from '@bem-react/classname';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { RootState } from 'store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { composeU, compose } from '@bem-react/core';
import { TextInput } from 'components/TextInput/TextInput';
import { changeRepoName, changeBuildCommand, changeMainBranch, changePeriod } from 'store/settings/settingsSlice';
import { Button as ButtonPresenter } from 'components/Button/Button';
import { withButtonViewDefault } from 'components/Button/_view/Button_view_default';
import { withButtonSizeM } from 'components/Button/_size/Button_size_m';
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import './Settings.scss';
import { saveSettings } from 'store/settings/settingsActions';

const cnSettings = cn('SettingsPage');

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  withButtonSizeM,
  withButtonTypeLink,
)(ButtonPresenter);

const Settings = () => {
  const dispatch = useDispatch();

  const { repoName, period, buildComand, mainBranch } = useSelector((state: RootState) => ({
    repoName: state.settingsSlice.repoName,
    period: state.settingsSlice.period,
    buildComand: state.settingsSlice.buildCommand,
    mainBranch: state.settingsSlice.mainBranch,
  }));

  return (
    <div className={cnSettings()}>
      <Header className="Layout" title="School CI Server" />
      <div className={cnSettings('Content', ['Layout'])}>
        <h2 className={cnSettings('Title')}>Settings</h2>
        <p className={cnSettings('Description')}>Configure repository connection and synchronization settings.</p>
        <TextInput
          label="GitHub repository"
          placeholder="user-name/repo-name"
          value={repoName || ''}
          onChange={e => dispatch(changeRepoName(e.target.value))}
          id="repoName"
          className={cnSettings('Input')}
        />
        <TextInput
          label="Build command"
          placeholder="npm run start"
          value={buildComand || ''}
          onChange={e => dispatch(changeBuildCommand(e.target.value))}
          id="buildComand"
          className={cnSettings('Input')}
        />
        <TextInput
          label="Main branch"
          placeholder="master"
          value={mainBranch || ''}
          onChange={e => dispatch(changeMainBranch(e.target.value))}
          id="mainBranch"
          className={cnSettings('Input')}
        />
        <TextInput
          label="Synchronize every"
          placeholder="10"
          value={period || 10}
          onChange={e => dispatch(changePeriod(Number(e.target.value)))}
          id="mainBranch"
          className={cnSettings('Input')}
        />
        <div className={cnSettings('Buttons')}>
          <Button size="m" view="action" className={cnSettings('Button')} onClick={() => dispatch(saveSettings())}>
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

export default Settings;
