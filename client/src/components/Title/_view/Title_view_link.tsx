import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ITitleProps, cnTitle } from '../index';
import { Link } from 'react-router-dom';

export interface ITitleViewLinkProps {
  /**
   * Вид заголовка
   */
  view?: 'link';
  /**
   * Адрес
   */
  to?: string;
}

/**
 * Модификатор, отвечающий за вид заголовка
 */
export const withTitleViewLink = withBemMod<ITitleViewLinkProps, ITitleProps>(
  cnTitle(),
  { view: 'link' },
  (Title) => (props) => (
    <Title {...props}>
      <Link className={cnTitle('Link')} to={props.to!}>
        {props.children}
      </Link>
    </Title>
  ),
);
