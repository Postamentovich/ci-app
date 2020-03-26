import React from 'react';
import { withBemMod } from '@bem-react/core';

import { ILinkProps, cnLink } from '../index';

export interface ILinkViewDefaultProps {
  view?: 'default';
}

export const withLinkViewDefault = withBemMod<ILinkViewDefaultProps, ILinkProps>(
  cnLink(),
  { view: 'default' },
  Link => props => <Link {...props} />,
);
