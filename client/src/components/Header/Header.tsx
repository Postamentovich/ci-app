import React, { FC } from 'react';

import { IHeaderProps, cnHeader } from './index';

export const Header: FC<IHeaderProps> = ({ children, className, as: Component = 'header', title, ...props }) => (
  <Component {...props} className={cnHeader({}, [className])}>
    <h1 className={cnHeader('Title')}>{title}</h1>
    <div className={cnHeader('Buttons')}>{children}</div>
  </Component>
);
