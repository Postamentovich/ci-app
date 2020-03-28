import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/time.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeTimeProps {
  /**
   * Тип иконки
   */
  type?: 'time';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeTime = withBemMod<IIconTypeTimeProps, IIconProps>(
  cnIcon(),
  { type: 'time' },
  Icon => props => <IconSvg />,
);
