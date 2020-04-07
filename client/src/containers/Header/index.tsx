import { ReactType } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Header.scss';

export interface IHeaderProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'header'
   */
  as?: ReactType;
  /**
   * Кнопки, в правой части
   */
  buttons?: JSX.Element;
  /**
   * Заголовок
   */
  title?: string;
  /**
   * Тип заголовка
   */
  type?: 'link' | 'default';
  /**
   * Адрес
   */
  to?: string;
}

export const cnHeader = cn('Header');
