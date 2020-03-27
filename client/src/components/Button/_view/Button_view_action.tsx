import { withBemMod } from '@bem-react/core';

import { IButtonProps, cnButton } from '../index';

export interface IButtonViewActionProps {
  view?: 'action';
}

export const withButtonViewAction = withBemMod<IButtonViewActionProps, IButtonProps>(cnButton(), { view: 'action' });
