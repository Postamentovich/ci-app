import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Header.scss';

export interface IHeaderProps extends IClassNameProps {
  as?: ReactType;
}

export const cnHeader = cn('Header');
