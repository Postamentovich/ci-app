import * as React from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from '../../../components/Icon/Icon';
import { withIconTypeCalendar } from '../../../components/Icon/_type/Icon_type_calendar';
import { cnBuildCard } from '../index';
import { formatDate } from '../../../utils/formatDate';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

const Icon = compose(withIconTypeCalendar)(IconPresenter);

interface BuildCardDateProps {
  /**
   * Дата начала запуска билда
   */
  date: string;
}

export const BuildCardDate: React.FC<BuildCardDateProps> = ({ date }) => {
  const { locale } = useSelector((state: RootState) => ({ locale: state.globalSlice.locale }));

  const formatedDate = formatDate(date, locale);

  return (
    <span className={cnBuildCard('Date')}>
      <Icon type="calendar" />
      <span className={cnBuildCard('DateTimeItem')}>{formatedDate}</span>
    </span>
  );
};
