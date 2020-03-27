import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/branch.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeBranchProps {
  type?: 'branch';
}

export const withIconTypeBranch = withBemMod<IIconTypeBranchProps, IIconProps>(
  cnIcon(),
  { type: 'branch' },
  Icon => props => <IconSvg />,
);
