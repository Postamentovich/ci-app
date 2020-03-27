import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;

export interface ICardProps extends IClassNameProps {
  as?: ReactType;
  statusIcon?: JSX.Element;
  taskId?: string;
  message?: string;
  branchName?: string;
  commitHash?: string;
  authorName?: string;
  date?: string;
  duration?: string;
}

export const cnCard = cn('Card');
