import { withBemMod } from '@bem-react/core';
import { ILinkProps, cnLink } from '../index';

export interface ILinkViewDefaultProps {
  /**
   * Вид ссылки
   */
  view?: 'default';
}

/**
 * Модификатор, отвечающий за вид ссылки
 */
export const withLinkViewDefault = withBemMod<ILinkViewDefaultProps, ILinkProps>(cnLink(), { view: 'default' });
