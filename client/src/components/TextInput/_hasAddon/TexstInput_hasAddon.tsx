import { withBemMod } from '@bem-react/core';
import { ITextInputProps, cnTextInput } from '../index';

export interface ITextInputHasAddonProps {
  hasAddon?: boolean;
}

/**
 * Модификатор, отвечающий за тип кнопки
 */
export const withTextInputHasAddon = withBemMod<ITextInputHasAddonProps, ITextInputProps>(cnTextInput(), {
  hasAddon: true,
});
