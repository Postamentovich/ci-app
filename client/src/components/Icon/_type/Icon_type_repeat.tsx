import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/repeat.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeRepeatProps {
  /**
   * Тип иконки
   */
  type?: 'repeat';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeRepeat = withBemMod<IIconTypeRepeatProps, IIconProps>(
  cnIcon(),
  { type: 'repeat' },
  Icon => props => <IconSvg />,
);
