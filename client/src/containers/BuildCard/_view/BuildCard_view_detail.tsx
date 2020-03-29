import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import { Link } from 'react-router-dom';
import { IBuildCardProps, cnBuildCard } from '../index';

export interface IBuildCardViewDetailsProps {
  /**
   * Тип карточки
   */
  view?: 'detail';
}

/**
 * Модификатор, отвечающий за тип карточки
 */
export const withBuildCardViewDetail = withBemMod<IBuildCardViewDetailsProps, IBuildCardProps>(cnBuildCard(), {
  view: 'detail',
});
