import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonWidthMaxProps {
  /**
   * Ширина кнопки
   */
  width?: 'max';
}

/**
 * Модификатор, отвечающий за максимальную ширину кнопки
 */
export const withButtonWidthMax = withBemMod<IButtonWidthMaxProps, IButtonProps>(cnButton(), {
  width: 'max',
});
