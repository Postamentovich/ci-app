import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/play.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypePlayProps {
  /**
   * Тип иконки
   */
  type?: 'play';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypePlay = withBemMod<IIconTypePlayProps, IIconProps>(
  cnIcon(),
  { type: 'play' },
  Icon => props => <IconSvg />,
);
