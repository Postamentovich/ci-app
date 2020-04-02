import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { compose, composeU } from '@bem-react/core';
import { RootState } from 'store/rootReducer';
import { globalSlice } from 'store/global/globalSlice';
import { Toast as ToastPresenter } from 'components/Toast/Toast';
import { withToastTypeError } from 'components/Toast/_type/Toast_type_error';
import { withToastTypeSuccess } from 'components/Toast/_type/Toast_type_success';
import { withToastTypeWarning } from 'components/Toast/_type/Toast_type_warning';
import { INotifyProps, cnNotify } from './index';
import './Notify.scss';

const Toast = compose(composeU(withToastTypeError, withToastTypeSuccess, withToastTypeWarning))(
  ToastPresenter,
);

/**
 * Контейнер для показа уведомлений
 */
export const Notify: FC<INotifyProps> = () => {
  const dispatch = useDispatch();

  const { notify } = useSelector((state: RootState) => ({
    notify: state.globalSlice.notify,
  }));

  return (
    <div className={cnNotify()}>
      <TransitionGroup className={cnNotify('List')}>
        {notify.map(({ message, id, type }) => (
          <CSSTransition key={id} timeout={500} className={cnNotify('Item')}>
            <Toast
              onClick={() => {
                dispatch(globalSlice.actions.removeNotify(id));
              }}
              type={type}
            >
              {message}
            </Toast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
