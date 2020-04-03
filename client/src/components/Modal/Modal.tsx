import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps, cnModal } from './index';
import './Modal.scss';

/**
 * Компонент для создания модальных окон
 */
export const Modal: FC<IModalProps> = ({ children, className, as: Component = 'div', ...props }) => {
  useEffect(() => {
    document.body.classList.add('body-no-scroll');

    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={cnModal()}>
      <Component className={cnModal('Content', [className])} {...props}>
        {children}
      </Component>
    </div>,
    document.body,
  );
};
