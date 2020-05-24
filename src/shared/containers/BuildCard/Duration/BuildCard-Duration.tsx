import * as React from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from '../../../components/Icon/Icon';
import { withIconTypeTime } from '../../../components/Icon/_type/Icon_type_time';
import { cnBuildCard } from '../index';
import { formatDuration } from 'utils/formatDuration';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

const Icon = compose(withIconTypeTime)(IconPresenter);

interface BuildCardDurationProps {
  /**
   * Продолжительность сборки
   */
  duration: number;
}

export const BuildCardDuration: React.FC<BuildCardDurationProps> = ({ duration }) => {
  const { locale } = useSelector((state: RootState) => ({ locale: state.globalSlice.locale }));

  const formatedDuration = formatDuration(duration, locale);

  return (
    <span className={cnBuildCard('Duration')}>
      <Icon type="time" />
      <span className={cnBuildCard('DateTimeItem')}>{formatedDuration}</span>
    </span>
  );
};
