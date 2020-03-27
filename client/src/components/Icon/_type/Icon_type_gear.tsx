import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/gear.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeLogoProps {
  type?: 'gear';
}

export const withIconTypeGear = withBemMod<IIconTypeLogoProps, IIconProps>(
  cnIcon(),
  { type: 'gear' },
  Icon => props => <IconSvg />,
);
