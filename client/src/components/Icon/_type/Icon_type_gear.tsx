import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/gear.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeGearProps {
  /**
   * Тип иконки
   */
  type?: 'gear';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeGear = withBemMod<IIconTypeGearProps, IIconProps>(
  cnIcon(),
  { type: 'gear' },
  Icon => props => <IconSvg />,
);
