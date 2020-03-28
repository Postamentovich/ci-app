import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ILogProps extends IClassNameProps {
  as?: ReactType;
}

export const cnLog = cn('Log');
