import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/logo.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeLogoProps {
  /**
   * Тип иконки
   */
  type?: 'logo';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeLogo = withBemMod<IIconTypeLogoProps, IIconProps>(
  cnIcon(),
  { type: 'logo' },
  (Icon) => (props) => <IconSvg />,
);
