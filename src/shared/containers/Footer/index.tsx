import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface IFooterProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'footer'
   */
  as?: ReactType;
}

export const cnFooter = cn('Footer');
