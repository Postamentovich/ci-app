import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ICardProps extends IClassNameProps {
  as?: ReactType;
}

export const cnCard = cn('Card');
