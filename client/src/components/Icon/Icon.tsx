import React, { FC } from 'react';
import { IIconProps, cnIcon } from './index';

export const Icon: FC<IIconProps> = ({ children, className, as: Component = 'i', ...props }) => (
  <Component {...props} className={cnIcon({}, [className])}>
    {children}
  </Component>
);
