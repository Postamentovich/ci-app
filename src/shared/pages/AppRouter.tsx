import React from 'react';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RootState } from '../store/rootReducer';
import { Spin } from '../components/Spin/Spin';

const SettingsPage = loadable(() => import('./SettingsPage/SettingsPage'), { fallback: <Spin /> });
const HistoryPage = loadable(() => import('./HistoryPage/HistoryPage'), { fallback: <Spin /> });
const DetailsPage = loadable(() => import('./DetailsPage/DetailsPage'), { fallback: <Spin /> });
const HomePage = loadable(() => import('./HomePage/HomePage'), { fallback: <Spin /> });

export const AppRoutes = () => {
  const { repoName } = useSelector((state: RootState) => ({
    repoName: state.settingsSlice.repoName,
  }));

  if (!repoName) {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={HistoryPage} />
      <Route exact path="/build/:id" component={DetailsPage} />
      <Route exact path="/settings" component={SettingsPage} />
      <Redirect to="/" />
    </Switch>
  );
};
