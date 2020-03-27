import { ReactType, ChangeEvent } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

export interface ITextInputProps extends IClassNameProps {
  as?: ReactType;
  type?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const cnTextInput = cn('TextInput');
