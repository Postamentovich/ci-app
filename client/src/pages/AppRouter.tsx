import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Settings from './Settings/Settings';
import BuildHistory from './BuildHistory/BuildHistory';
import BuildDetails from './BuildDetails/BuildDetails';

const AppRoutes = () => {
  const { repoName } = useSelector((state: RootState) => ({
    repoName: state.settingsSlice.repoName,
  }));

  if (!repoName) {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/settings" exact component={Settings} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={BuildHistory} />
      <Route exact path="/build/:id" component={BuildDetails} />
      <Route exact path="/settings" component={Settings} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRoutes;
