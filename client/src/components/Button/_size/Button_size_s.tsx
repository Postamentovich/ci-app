import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonSizeSProps {
  /**
   * Размер кнопки
   */
  size?: 's';
}

/**
 * Модификатор, отвечающий за размер кнопки
 */
export const withButtonSizeS = withBemMod<IButtonSizeSProps, IButtonProps>(cnButton(), { size: 's' });
