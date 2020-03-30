import { withBemMod } from '@bem-react/core';
import { ITitleProps, cnTitle } from '../index';

export interface ITitleViewDefaultProps {
  /**
   * Вид заголовка
   */
  view?: 'default';
}

/**
 * Модификатор, отвечающий за вид заголовка
 */
export const withTitleViewDefault = withBemMod<ITitleViewDefaultProps, ITitleProps>(cnTitle(), {
  view: 'default',
});
