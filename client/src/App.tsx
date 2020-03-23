import React, { FC } from 'react';
import { compose, composeU } from '@bem-react/core';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Button as ButtonPresenter } from './components/Button/Button';
import { withButtonTypeLink } from './components/Button/_type/Button_type_link';
import { withButtonThemeAction } from './components/Button/_theme/Button_theme_action';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import BuildDetails from './pages/BuildDetails/BuildDetails';
import BuildHistory from './pages/BuildHistory/BuildHistory';

const App: FC = () => {
  const isSettings = false;
  return (
    <Router>
      <div className="App">
        <Route path="/settings" component={Settings} />
        <Route path="/build/:id" component={BuildDetails} />
        <Route exact path="/" component={!isSettings ? Home : BuildHistory} />
      </div>
    </Router>
  );
};

export default App;
