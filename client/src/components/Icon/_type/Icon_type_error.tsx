import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/error.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeErrorProps {
  /**
   * Тип иконки
   */
  type?: 'error';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeError = withBemMod<IIconTypeErrorProps, IIconProps>(
  cnIcon(),
  { type: 'error' },
  (Icon) => (props) => <IconSvg />,
);
