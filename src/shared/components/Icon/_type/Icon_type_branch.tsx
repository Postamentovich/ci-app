import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/branch.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeBranchProps {
  /**
   * Тип иконки
   */
  type?: 'branch';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeBranch = withBemMod<IIconTypeBranchProps, IIconProps>(
  cnIcon(),
  { type: 'branch' },
  (Icon) => (props) => <IconSvg />,
);
