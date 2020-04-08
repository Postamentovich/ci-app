import { ReactType, ReactNode } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Title.css';

export interface ITitleProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'h1'
   */
  as?: ReactType;
  /**
   * Дополнительный класс
   */
  className?: string;
  /**
   * Содержимое заголовка
   */
  children?: ReactNode;
}

export const cnTitle = cn('Title');
