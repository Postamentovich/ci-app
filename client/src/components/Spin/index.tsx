import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ISpinProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'div'
   */
  as?: ReactType;
}

export const cnSpin = cn('Spin');
