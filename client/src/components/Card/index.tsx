import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import { BuildStatus } from 'api/models/models';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;

export interface ICardProps extends IClassNameProps {
  as?: ReactType;
  status?: BuildStatus;
  taskId?: string;
  message?: string;
  branchName?: string;
  commitHash?: string;
  authorName?: string;
  date?: string;
  duration?: string;
}

export const cnCard = cn('Card');
