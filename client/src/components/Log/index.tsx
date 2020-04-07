import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ILogProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'div'
   */
  as?: ReactType;
  /**
   * Текст лога в ansi формате
   */
  ansi?: string;
}

export const cnLog = cn('Log');
