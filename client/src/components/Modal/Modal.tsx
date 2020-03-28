import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps, cnModal } from './index';
import './Modal.scss';

export const Modal: FC<IModalProps> = ({ children, className, as: Component = 'div', ...props }) => {
  return ReactDOM.createPortal(
    <div className={cnModal()}>
      <Component className={cnModal('Content', [className])} {...props}>
        {children}
      </Component>
    </div>,
    document.body,
  );
};
