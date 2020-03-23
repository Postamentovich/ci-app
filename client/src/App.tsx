import React, { FC } from 'react';
import { compose, composeU } from '@bem-react/core';

import { Button as ButtonPresenter } from './Components/Button/Button';
import { withButtonTypeLink } from './Components/Button/_type/Button_type_link';
import { withButtonThemeAction } from './Components/Button/_theme/Button_theme_action';

const Button = compose(composeU(withButtonThemeAction), withButtonTypeLink)(ButtonPresenter);

const App: FC = () => (
  <div className="App">
    <Button>I'm basic</Button>
    <Button type="link" href="#stub">cxzc</Button>
    <Button theme="action">I'm theme action</Button>
    <Button theme="action" type="link">cxzc</Button>
  </div>
);

export default App;
