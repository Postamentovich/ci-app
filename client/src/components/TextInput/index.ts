import { ReactType, ChangeEvent, ReactNode } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ITextInputProps extends IClassNameProps {
  /**
   * HTML-атрибут для рендера
   * @default 'input'
   */
  as?: ReactType;
  /**
   * HTML type атрибут
   */
  type?: string;
  /**
   * Label
   */
  label?: string;
  /**
   * HTML id атрибут
   */
  id?: string;
  /**
   * HTML placeholder атрибут
   */
  placeholder?: string;
  /**
   * Текущее значение
   */
  value?: string | number;
  /**
   * Обработка изменения текста
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Дополнительный контент после контрола
   */
  addonAfter?: ReactNode;
  /**
   * Дополнительный контент перед контролом
   */
  addonBefore?: ReactNode;
}

export const cnTextInput = cn('TextInput');
