import { ReactType, MouseEventHandler } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;

export interface ICardProps extends IClassNameProps {
  as?: ReactType;
}

export const cnCard = cn('Card');
