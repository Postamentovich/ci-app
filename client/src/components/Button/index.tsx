import { ReactType, MouseEventHandler } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;
export interface IButtonProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера кнопки
   * @default 'button'
   */
  as?: ReactType;
  /**
   * Иконка слева от текста кнопки
   */
  iconLeft?: JSX.Element;
  /**
   * Обработчик клика на кнопку
   */
  onClick?: (event: MouseEventHandler<ContainerElement>) => void;
}

export const cnButton = cn('Button');
