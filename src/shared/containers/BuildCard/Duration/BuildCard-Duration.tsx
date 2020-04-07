import * as React from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from '../../../components/Icon/Icon';
import { withIconTypeTime } from '../../../components/Icon/_type/Icon_type_time';
import { cnBuildCard } from '../index';

const Icon = compose(withIconTypeTime)(IconPresenter);

interface BuildCardDurationProps {
  /**
   * Продолжительность сборки
   */
  duration: number;
}

export const BuildCardDuration: React.FC<BuildCardDurationProps> = ({ duration }) => {
  const date = new Date(0, 0, 0, 0, 0, 0, duration);

  const hours = date.getHours();

  const minutes = date.getMinutes();

  const seconds = date.getSeconds();

  /**
   * Форматируем длительность под нужный формат
   */
  const formatedDuration = hours ? `${hours} ч ${minutes} мин` : `${minutes} мин ${seconds} сек`;

  return (
    <span className={cnBuildCard('Duration')}>
      <Icon type="time" />
      <span className={cnBuildCard('DateTimeItem')}>{formatedDuration}</span>
    </span>
  );
};
