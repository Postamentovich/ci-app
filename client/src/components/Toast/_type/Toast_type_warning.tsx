import { withBemMod } from '@bem-react/core';
import { IToastProps, cnToast } from '../index';

export interface IToastTypeWarningProps {
  /**
   * Тип уведомления
   */
  type?: 'warning';
}

/**
 * Модификатор, отвечающий за тип уведомления
 */
export const withToastTypeWarning = withBemMod<IToastTypeWarningProps, IToastProps>(cnToast(), {
  type: 'warning',
});
