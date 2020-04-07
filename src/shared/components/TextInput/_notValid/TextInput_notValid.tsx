import { withBemMod } from '@bem-react/core';
import { ITextInputProps, cnTextInput } from '../index';

export interface ITextInputnotValidProps {
  /**
   * Валидны введенные данные в форму или нет
   */
  notValid?: boolean;
}

/**
 * Модификатор, отвечающий за вид инпута
 */
export const withTextInputNotValid = withBemMod<ITextInputnotValidProps, ITextInputProps>(cnTextInput(), {
  notValid: true,
});
