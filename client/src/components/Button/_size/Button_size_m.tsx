import { withBemMod } from '@bem-react/core';

import { IButtonProps, cnButton } from '../index';

export interface IButtonSizeMProps {
  size?: 'm';
}

export const withButtonSizeM = withBemMod<IButtonSizeMProps, IButtonProps>(cnButton(), { size: 'm' });
