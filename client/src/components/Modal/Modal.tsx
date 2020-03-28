import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps, cnModal } from './index';
import './Modal.scss';

export const Modal: FC<IModalProps> = ({ children, className, as: Component = 'div', ...props }) => {
  return ReactDOM.createPortal(
    <Component {...props} className={cnModal({}, [className])}>
      <div className={cnModal('Content')}>{children}</div>
    </Component>,
    document.body,
  );
};
