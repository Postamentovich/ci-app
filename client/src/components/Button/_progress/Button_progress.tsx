import { withBemMod } from '@bem-react/core';
import { IButtonProps, cnButton } from '../index';

export interface IButtonProgressProps {
  /**
   * Добавлен прогресс или нет
   */
  progress?: boolean;
}

/**
 * Модификатор, отвечающий за добавления прогресса на кнопку
 */
export const withButtonProgress = withBemMod<IButtonProgressProps, IButtonProps>(cnButton(), {
  progress: true,
});
