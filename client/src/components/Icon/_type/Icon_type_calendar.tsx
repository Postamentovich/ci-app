import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { ReactComponent as IconSvg } from '../assets/calendar.svg';
import { IIconProps, cnIcon } from '../index';

export interface IIconTypeCalendarProps {
  /**
   * Тип иконки
   */
  type?: 'calendar';
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeCalendar = withBemMod<IIconTypeCalendarProps, IIconProps>(
  cnIcon(),
  { type: 'calendar' },
  Icon => props => <IconSvg />,
);
