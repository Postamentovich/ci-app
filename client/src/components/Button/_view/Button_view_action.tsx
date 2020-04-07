import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonViewActionProps {
  /**
   * Внешний вид кнопки
   */
  view?: 'action';
}

/**
 * Модификатор, отвечающий за внешний вид кнопки
 */
export const withButtonViewAction = withBemMod<IButtonViewActionProps, IButtonProps>(cnButton(), {
  view: 'action',
});
