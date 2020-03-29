import * as React from 'react';
import { withBemMod, compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeClear } from 'components/Icon/_type/Icon_type_clear';
import { ITextInputProps, cnTextInput } from '../index';

export interface ITextInputHasAddonProps {
  hasAddon?: boolean;
  /**
   * Дополнительный контент после контрола
   */
  addonAfter?: React.ReactNode;
}

const Icon = compose(withIconTypeClear)(IconPresenter);

/**
 * Модификатор, отвечающий за тип кнопки
 */
export const withTextInputHasAddon = withBemMod<ITextInputHasAddonProps, ITextInputProps>(
  cnTextInput(),
  { hasAddon: true },
  Button => ({
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
    hasAddon,
    addonAfter,
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
      {hasAddon && <span className={cnTextInput('Addon')}>{addonAfter}</span>}
      {hasClear && (
        <button type="button" className={cnTextInput('Clear')} onClick={onClearClick}>
          <Icon type="clear" />
        </button>
      )}
    </Component>
  ),
);
