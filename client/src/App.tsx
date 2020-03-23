import React, { FC } from 'react';
import { compose, composeU } from '@bem-react/core';

import { Button as ButtonPresenter } from './Component/Button/Button';
import { withButtonTypeLink } from './Component/Button/_type/Button_type_link';
import { withButtonThemeAction } from './Component/Button/_theme/Button_theme_action';

const Button = compose(composeU(withButtonThemeAction), withButtonTypeLink)(ButtonPresenter);

const App: FC = () => (
  <div className="App">
    <Button>m basic</Button>
    <Button type="link" href="#stub">cxzc</Button>
    <Button theme="action">m theme action</Button>
    <Button theme="action" type="link">cxzc</Button>
  </div>
);

export default App;
