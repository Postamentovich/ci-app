import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonSizeMProps {
  /**
   * Размер кнопки
   */
  size?: 'm';
}

/**
 * Модификатор, отвечающий за размер кнопки
 */
export const withButtonSizeM = withBemMod<IButtonSizeMProps, IButtonProps>(cnButton(), { size: 'm' });
