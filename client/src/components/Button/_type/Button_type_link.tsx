import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { Link } from 'react-router-dom';
import { IButtonProps, cnButton } from '../index';

export interface IButtonTypeLinkProps {
  type?: 'link';
  to?: string;
}

export const withButtonTypeLink = withBemMod<IButtonTypeLinkProps, IButtonProps>(
  cnButton(),
  { type: 'link' },
  Button => props => <Button {...props} as={Link} />,
);
