import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/success.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeSuccessProps {
  type?: 'success';
}

export const withIconTypeSuccess = withBemMod<IIconTypeSuccessProps, IIconProps>(
  cnIcon(),
  { type: 'success' },
  Icon => props => <IconSvg />,
);
