import React, { FC } from 'react';
import { ITextInputProps, cnTextInput } from './index';
import './TextInput.scss';

export const TextInput: FC<ITextInputProps> = ({
  children,
  className,
  as: Component = 'input',
  type = 'text',
  id,
  placeholder,
  label,
  ...props
}) => (
  <div className={cnTextInput({}, [className])}>
    <label className={cnTextInput('Label')} htmlFor={id}>
      {label}
    </label>
    <Component className={cnTextInput('Input')} placeholder={placeholder} type={type} id={id} {...props}>
      {children}
    </Component>
  </div>
);
