import { withBemMod } from '@bem-react/core';
import { IToastProps, cnToast } from '../index';

export interface IToastTypeSuccessProps {
  /**
   * Тип уведомления
   */
  type?: 'success';
}

/**
 * Модификатор, отвечающий за тип кнопки
 */
export const withToastTypeSuccess = withBemMod<IToastTypeSuccessProps, IToastProps>(cnToast(), {
  type: 'success',
});
