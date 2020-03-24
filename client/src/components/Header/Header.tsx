import React, { FC } from 'react';

import { IHeaderProps, cnHeader } from './index';

export const Header: FC<IHeaderProps> = ({ children, className, as: Component = 'header', ...props }) => (
  <Component {...props} className={cnHeader({}, [className])}>
    {children}
  </Component>
);
