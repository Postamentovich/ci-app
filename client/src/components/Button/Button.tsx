import React, { FC } from 'react';
import { IButtonProps, cnButton } from './index';
import './Button.scss';

export const Button: FC<IButtonProps> = ({ children, className, as: Component = 'button', iconLeft, ...props }) => (
  <Component {...props} className={cnButton({}, [className])}>
    {iconLeft}
    {children && <span className={cnButton('Text')}>{children}</span>}
  </Component>
);
