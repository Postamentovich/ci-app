import React, { FC, useEffect, useRef, useCallback } from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from '../../components/Icon/Icon';
import { withIconTypeClear } from '../../components/Icon/_type/Icon_type_clear';
import { IToastProps, cnToast } from './index';
import './Toast.css';

const Icon = compose(withIconTypeClear)(IconPresenter);

/**
 * Компонент для создания уведомлений
 */
export const Toast: FC<IToastProps> = ({ children, className, onClick, as: Component = 'div', ...props }) => {
  const timeout = useRef<any>();

  /**
   * Окно автоматически закрывается через 2 секунды
   * При наведении на уведомление, таймер останавливается
   */
  const startAutoRemove = useCallback(() => {
    timeout.current = setTimeout(() => {
      if (onClick) onClick();
    }, 2000);
  }, [onClick]);

  useEffect(() => {
    startAutoRemove();
  }, [startAutoRemove]);

  return (
    <Component
      {...props}
      className={cnToast({}, [className])}
      onMouseEnter={() => clearTimeout(timeout.current)}
      onMouseLeave={startAutoRemove}
    >
      {children}
      <button type="button" className={cnToast('Close')} onClick={onClick}>
        <Icon type="clear" />
      </button>
    </Component>
  );
};
