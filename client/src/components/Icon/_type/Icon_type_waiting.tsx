import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/waiting.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeWaitingProps {
  type?: 'waiting';
}

export const withIconTypeWaiting = withBemMod<IIconTypeWaitingProps, IIconProps>(
  cnIcon(),
  { type: 'waiting' },
  Icon => props => <IconSvg />,
);
