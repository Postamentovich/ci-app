import React, { FC } from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeClear } from 'components/Icon/_type/Icon_type_clear';
import { ITextInputProps, cnTextInput } from './index';
import './TextInput.scss';

const Icon = compose(withIconTypeClear)(IconPresenter);

export const TextInput: FC<ITextInputProps> = ({
  className,
  as: Component = 'div',
  type = 'text',
  id,
  placeholder,
  label,
  value,
  onChange,
  onClearClick,
  hasClear,
  required,
}) => (
  <Component className={cnTextInput({}, [className])}>
    <label className={cnTextInput('Label')} htmlFor={id} aria-required={required}>
      {label}
    </label>
    <input
      onChange={onChange}
      className={cnTextInput('Input')}
      placeholder={placeholder}
      type={type}
      id={id}
      value={value}
    />
    {hasClear && (
      <button type="button" className={cnTextInput('Clear')} onClick={onClearClick}>
        <Icon type="clear" />
      </button>
    )}
  </Component>
);
