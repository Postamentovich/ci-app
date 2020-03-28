import React, { MouseEventHandler } from 'react';
import { withBemMod, compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeClear } from 'components/Icon/_type/Icon_type_clear';
import { ITextInputProps, cnTextInput } from '../index';

export interface ITextInputHasClearProps {
  /**
   * Наличие крестика для очистки текстового поля.
   */
  hasClear?: boolean;
  /**
   * Обработчик клика по крестику.
   */
  onClearClick?: MouseEventHandler<HTMLButtonElement>;
}

const Icon = compose(withIconTypeClear)(IconPresenter);

/**
 * Модификатор, отвечающий за добавление крестика
 */
export const withTextInputHasClear = withBemMod<ITextInputHasClearProps, ITextInputProps>(
  cnTextInput(),
  { hasClear: true },
  TextInput => ({
    className,
    label,
    hasClear,
    value,
    placeholder,
    type,
    id,
    onClearClick,
    as: Component = 'input',
    children,
    ...props
  }) => (
    <div className={cnTextInput({}, [className])}>
      <label className={cnTextInput('Label')} htmlFor={id}>
        {label}
      </label>
      <Component
        className={cnTextInput('Input')}
        value={value}
        placeholder={placeholder}
        type={type}
        id={id}
        {...props}
      >
        {children}
      </Component>
      <button type="button" className={cnTextInput('Clear')} onClick={onClearClick}>
        <Icon type="clear" />
      </button>
    </div>
  ),
);
