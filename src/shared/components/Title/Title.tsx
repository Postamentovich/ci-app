import React, { FC } from 'react';
import { ITitleProps, cnTitle } from './index';

/**
 * Компонент для создания заголовков
 */
export const Title: FC<ITitleProps> = ({ children, className, as: Component = 'h1', ...props }) => (
  <Component {...props} className={cnTitle({}, [className])}>
    {children}
  </Component>
);
