import React, { FC } from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeClear } from 'components/Icon/_type/Icon_type_clear';
import { IToastProps, cnToast } from './index';
import './Toast.scss';

const Icon = compose(withIconTypeClear)(IconPresenter);

/**
 * Компонент для создания уведомлений
 */
export const Toast: FC<IToastProps> = ({ children, className, onClick, as: Component = 'div', ...props }) => (
  <Component {...props} className={cnToast({}, [className])}>
    {children}
    <button type="submit" className={cnToast('Close')} onClick={onClick}>
      <Icon type="clear" />
    </button>
  </Component>
);
