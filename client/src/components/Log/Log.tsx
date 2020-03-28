import React, { FC } from 'react';
import { ILogProps, cnLog } from './index';
import './Log.scss';

export const Log: FC<ILogProps> = ({ children, className, as: Component = 'div', ...props }) => (
  <Component {...props} className={cnLog({}, [className])}>
    <pre className={cnLog('Container')}>{children}</pre>
  </Component>
);
