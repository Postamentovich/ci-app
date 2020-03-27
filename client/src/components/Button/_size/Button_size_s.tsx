import { withBemMod } from '@bem-react/core';

import { IButtonProps, cnButton } from '../index';

export interface IButtonSizeSProps {
  size?: 's';
}

export const withButtonSizeS = withBemMod<IButtonSizeSProps, IButtonProps>(cnButton(), { size: 's' });
