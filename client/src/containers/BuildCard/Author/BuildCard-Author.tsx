import * as React from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeUser } from 'components/Icon/_type/Icon_type_user';
import { cnBuildCard } from '../index';

const Icon = compose(withIconTypeUser)(IconPresenter);

interface BuildCardAuthorProps {
  /** Имя автора */
  authorName: string;
}

export const BuildCardAuthor: React.FC<BuildCardAuthorProps> = ({ authorName }) => {
  return (
    <div className={cnBuildCard('Author')}>
      <Icon type="user" />
      <span className={cnBuildCard('AuthorName')}>{authorName}</span>
    </div>
  );
};
