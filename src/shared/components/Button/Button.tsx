import React, { FC } from 'react';
import { IButtonProps, cnButton } from './index';
import './Button.css';

/**
 * Компонент для создания кнопок
 */
export const Button: FC<IButtonProps> = ({
  disabled,
  children,
  className,
  as: Component = 'button',
  iconLeft,
  ...props
}) => (
  <Component aria-disabled={disabled} {...props} className={cnButton({}, [className])}>
    {iconLeft}
    {children && <span className={cnButton('Text')}>{children}</span>}
  </Component>
);
