import { ReactType, ChangeEvent, ReactNode, MouseEventHandler } from 'react';
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
   * Дополнительный контент перед контролом
   */
  addonBefore?: ReactNode;
  /**
   * Обязательное поле или нет
   */
  required?: boolean;
  /**
   * Наличие крестика для очистки текстового поля.
   */
  hasClear?: boolean;
  /**
   * Обработчик клика по крестику.
   */
  onClearClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Дополнительный контент после контрола
   */
  addonAfter?: React.ReactNode;
}

export const cnTextInput = cn('TextInput');
