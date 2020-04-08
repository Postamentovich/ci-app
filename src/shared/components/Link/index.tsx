import { ReactType, ReactNode } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Link.css';

export interface ILinkProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'a'
   */
  as?: ReactType;
  /**
   * Адрес
   */
  href: string;
  /**
   * Дополнительный класс
   */
  className?: string;
  /**
   * Содержимое ссылки
   */
  children?: ReactNode;
  /**
   * HTML-атрибут `title`
   */
  title?: string;
}

export const cnLink = cn('Link');
