import React, { FC } from 'react';
import { ICardProps, cnCard } from './index';
import './Card.scss';

export const Card: FC<ICardProps> = ({children, className, as: Component = 'div', ...props }) => (
  <Component {...props} className={cnCard({}, [className])}>
    {children}
  </Component>
);
