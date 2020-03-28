import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonWidthAutoProps {
  /**
   * Ширина кнопки
   */
  width?: 'auto';
}

/**
 * Модификатор, отвечающий за автоматическую ширину кнопки
 */
export const withButtonWidthAuto = withBemMod<IButtonWidthAutoProps, IButtonProps>(cnButton(), { width: 'auto' });
