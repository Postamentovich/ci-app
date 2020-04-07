import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/success.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeSuccessProps {
  /**
   * Тип иконки
   */
  type?: 'success';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeSuccess = withBemMod<IIconTypeSuccessProps, IIconProps>(
  cnIcon(),
  { type: 'success' },
  (Icon) => (props) => <IconSvg />,
);
