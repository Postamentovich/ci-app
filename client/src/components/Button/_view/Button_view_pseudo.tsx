import { withBemMod } from '@bem-react/core';

import { IButtonProps, cnButton } from '../index';

export interface IButtonViewPseudoProps {
  view?: 'pseudo';
}

export const withButtonViewPseudo = withBemMod<IButtonViewPseudoProps, IButtonProps>(cnButton(), { view: 'pseudo' });
