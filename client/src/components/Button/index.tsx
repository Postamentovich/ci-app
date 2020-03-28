import { ReactType, MouseEventHandler, ReactNode } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;
export interface IButtonProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'button'
   */
  as?: ReactType;
  /**
   * Текст кнопки.
   */
  children?: ReactNode;
  /**
   * Иконка слева от текста кнопки
   */
  iconLeft?: JSX.Element;
  /**
   * Неактивное состояние кнопки
   */
  disabled?: boolean;
  /**
   * Обработчик клика на кнопку
   */
  onClick?: (event: MouseEventHandler<ContainerElement>) => void;
}

export const cnButton = cn('Button');
