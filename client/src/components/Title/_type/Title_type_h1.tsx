import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ITitleProps, cnTitle } from '../index';

export interface ITitleTypeH1Props {
  /**
   * Тип заголовка
   */
  type?: 'h1';
}

/**
 * Модификатор, отвечающий за тип заголовка
 */
export const withTitleTypeH1 = withBemMod<ITitleTypeH1Props, ITitleProps>(
  cnTitle(),
  { type: 'h1' },
  (Title) => (props) => <Title {...props} as="h1" />,
);
