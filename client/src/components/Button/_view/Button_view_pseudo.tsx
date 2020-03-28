import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonViewPseudoProps {
  /**
   * Внешний вид кнопки
   */
  view?: 'pseudo';
}

/**
 * Модификатор, отвечающий за внешний вид кнопки
 */
export const withButtonViewPseudo = withBemMod<IButtonViewPseudoProps, IButtonProps>(cnButton(), { view: 'pseudo' });
