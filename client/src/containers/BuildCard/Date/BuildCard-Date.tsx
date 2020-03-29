import * as React from 'react';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { compose } from '@bem-react/core';
import { withIconTypeCalendar } from 'components/Icon/_type/Icon_type_calendar';
import { cnBuildCard } from '../index';

const Icon = compose(withIconTypeCalendar)(IconPresenter);

interface BuildCardDateProps {
  date: string;
}

export const BuildCardDate: React.FC<BuildCardDateProps> = ({ date }) => {
  const formatedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(new Date(date))
    .replace(/\.,/, ',');

  return (
    <span className={cnBuildCard('Date')}>
      <Icon type="calendar" />
      <span className={cnBuildCard('DateTimeItem')}>{formatedDate}</span>
    </span>
  );
};
