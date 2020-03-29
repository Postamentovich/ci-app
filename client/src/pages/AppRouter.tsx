import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { SettingsPage } from './SettingsPage/SettingsPage';
import { HistoryPage } from './HistoryPage/HistoryPage';
import { DetailsPage } from './DetailsPage/DetailsPage';

const AppRoutes = () => {
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

export default AppRoutes;
