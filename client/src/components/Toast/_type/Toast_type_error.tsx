import { withBemMod } from '@bem-react/core';
import { IToastProps, cnToast } from '../index';

export interface IToastTypeErrorProps {
  /**
   * Тип уведомления
   */
  type?: 'error';
}

/**
 * Модификатор, отвечающий за тип кнопки
 */
export const withToastTypeError = withBemMod<IToastTypeErrorProps, IToastProps>(cnToast(), {
  type: 'error',
});
