import React, { FC } from 'react';
import { ILinkProps, cnLink } from './index';

/**
 * Компонент для создания ссылок
 */
export const Link: FC<ILinkProps> = ({ children, className, as: Component = 'a', ...props }) => (
  <Component {...props} className={cnLink({}, [className])}>
    {children}
  </Component>
);
