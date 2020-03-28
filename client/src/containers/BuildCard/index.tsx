import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import { BuildStatus } from 'api/models/models';

export interface IBuildCardProps extends IClassNameProps {
  as?: ReactType;
  status?: BuildStatus;
  taskId?: string;
  message?: string;
  branchName?: string;
  commitHash?: string;
  authorName?: string;
  date?: string;
  duration?: number;
  to?: string;
  type?: 'link';
}

export const cnBuildCard = cn('BuildCard');
