import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ITitleProps, cnTitle } from '../index';

export interface ITitleTypeH4Props {
  /**
   * Тип заголовка
   */
  type?: 'h4';
}

/**
 * Модификатор, отвечающий за тип заголовка
 */
export const withTitleTypeH4 = withBemMod<ITitleTypeH4Props, ITitleProps>(
  cnTitle(),
  { type: 'h4' },
  (Title) => (props) => <Title {...props} as="h4" />,
);
