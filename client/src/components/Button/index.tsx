import { ReactType, MouseEventHandler } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export declare type ContainerElement = HTMLButtonElement | HTMLAnchorElement;
export interface IButtonProps extends IClassNameProps {
  as?: ReactType;
  iconLeft?: JSX.Element;
  onClick?: (event: MouseEventHandler<ContainerElement>) => void;
}

export const cnButton = cn('Button');
