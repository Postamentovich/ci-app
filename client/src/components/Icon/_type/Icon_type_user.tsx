import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/user.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeUserProps {
  /**
   * Тип иконки
   */
  type?: 'user';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeUser = withBemMod<IIconTypeUserProps, IIconProps>(
  cnIcon(),
  { type: 'user' },
  (Icon) => (props) => <IconSvg />,
);
