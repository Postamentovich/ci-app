import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { Link } from 'react-router-dom';
import { IButtonProps, cnButton } from '../index';

export interface IButtonTypeLinkProps {
  /**
   * Тип кнопки
   */
  type?: 'link';
  /**
   * Адрес
   */
  to?: string;
}

/**
 * Модификатор, отвечающий за тип кнопки
 */
export const withButtonTypeLink = withBemMod<IButtonTypeLinkProps, IButtonProps>(
  cnButton(),
  { type: 'link' },
  Button => props => <Button {...props} as={Link} />,
);
