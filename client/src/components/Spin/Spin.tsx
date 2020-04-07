import * as React from 'react';
import { ISpinProps, cnSpin } from './index';
import './Spin.scss';

/**
 * Компонент для создания лоадера
 */
export const Spin: React.FC<ISpinProps> = ({ children, className, as: Component = 'div', ...props }) => (
  <Component {...props} className={cnSpin({}, [className])}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" />
    </svg>
  </Component>
);
