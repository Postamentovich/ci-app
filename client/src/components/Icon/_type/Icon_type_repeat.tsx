import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/repeat.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeRepeatProps {
  type?: 'repeat';
}

export const withIconTypeRepeat = withBemMod<IIconTypeRepeatProps, IIconProps>(
  cnIcon(),
  { type: 'repeat' },
  Icon => props => <IconSvg />,
);
