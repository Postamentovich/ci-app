import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconLogo } from '../assets/logo.svg';

import { IIconProps, cnIcon } from '../index';

export interface IIconTypeLogoProps {
  type?: 'logo';
}

export const withIconTypeLogo = withBemMod<IIconTypeLogoProps, IIconProps>(
  cnIcon(),
  { type: 'logo' },
  Icon => props => <IconLogo />,
);
