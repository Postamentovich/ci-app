import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from 'store/rootReducer';
import { removeNotify } from 'store/global/globalSlice';
import { Toast } from 'components/Toast/Toast';
import { INotifyProps, cnNotify } from './index';
import './Notify.scss';

export const Notify: FC<INotifyProps> = () => {
  const dispatch = useDispatch();

  const { notify } = useSelector((state: RootState) => ({
    notify: state.globalSlice.notify,
  }));

  return (
    <div className={cnNotify()}>
      <TransitionGroup className={cnNotify('List')}>
        {notify.map(({ message, id }) => (
          <CSSTransition key={id} timeout={500} className={cnNotify('Item')}>
            <Toast
              onClick={() => {
                dispatch(removeNotify(id));
              }}
            >
              {message}
            </Toast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
