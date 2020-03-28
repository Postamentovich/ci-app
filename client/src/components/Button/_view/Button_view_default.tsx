import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonViewDefaultProps {
  /**
   * Внешний вид кнопки
   */
  view?: 'default';
}

/**
 * Модификатор, отвечающий за внешний вид кнопки
 */
export const withButtonViewDefault = withBemMod<IButtonViewDefaultProps, IButtonProps>(cnButton(), { view: 'default' });
