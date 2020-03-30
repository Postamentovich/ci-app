import { withBemMod } from '@bem-react/core';
import { IBuildCardProps, cnBuildCard } from '../index';

export interface IBuildCardViewDetailsProps {
  /**
   * Вид карточки
   */
  view?: 'detail';
}

/**
 * Модификатор, отвечающий за детальный вид карточки
 */
export const withBuildCardViewDetail = withBemMod<IBuildCardViewDetailsProps, IBuildCardProps>(
  cnBuildCard(),
  {
    view: 'detail',
  },
);
