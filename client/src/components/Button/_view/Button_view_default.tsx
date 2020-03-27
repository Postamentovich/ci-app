import { withBemMod } from '@bem-react/core';

import { IButtonProps, cnButton } from '../index';

export interface IButtonViewDefaultProps {
  view?: 'default';
}

export const withButtonViewDefault = withBemMod<IButtonViewDefaultProps, IButtonProps>(cnButton(), { view: 'default' });
