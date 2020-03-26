import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Link.scss';

export interface ILinkProps extends IClassNameProps {
  as?: ReactType;
  href: string;
}

export const cnLink = cn('Link');
