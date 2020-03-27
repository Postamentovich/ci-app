import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/play.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypePlayProps {
  type?: 'play';
}

export const withIconTypePlay = withBemMod<IIconTypePlayProps, IIconProps>(
  cnIcon(),
  { type: 'play' },
  Icon => props => <IconSvg />,
);
