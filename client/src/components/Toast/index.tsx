import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface IToastProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'h1'
   */
  as?: ReactType;

  onClick?: any;
}

export const cnToast = cn('Toast');
