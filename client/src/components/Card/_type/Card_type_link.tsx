import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { Link } from 'react-router-dom';
import { ICardProps, cnCard } from '../index';

export interface IButtonTypeLinkProps {
  /**
   * Тип карточки
   */
  type?: 'link';
  /**
   * Адрес
   */
  to?: string;
}

/**
 * Модификатор, отвечающий за тип карточки
 */
export const withCardTypeLink = withBemMod<IButtonTypeLinkProps, ICardProps>(
  cnCard(),
  { type: 'link' },
  Card => props => <Card {...props} as={Link} />,
);
