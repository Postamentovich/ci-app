import React, { FC } from 'react';
import { compose, composeU } from '@bem-react/core';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Button as ButtonPresenter } from './components/Button/Button';
import { withButtonTypeLink } from './components/Button/_type/Button_type_link';
import { withButtonThemeAction } from './components/Button/_theme/Button_theme_action';

const Home = () => {
  return <div>home</div>;
};

const One = () => {
  return <div>One</div>;
};

const Two = () => {
  return <div>Two</div>;
};


const App: FC = () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/one" component={One} />
      <Route exact path="/two" component={Two} />
    </div>
  </Router>
);

export default App;
