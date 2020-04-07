import React, { FC } from 'react';
import { compose } from '@bem-react/core';
import { Card as CardPresenter } from 'components/Card/Card';
import { withCardTypeLink } from 'components/Card/_type/Card_type_link';
import { IBuildCardProps, cnBuildCard } from './index';
import { BuildCardStatus } from './Status/BuildCard-Status';
import { BuildCardDate } from './Date/BuildCard-Date';
import { BuildCardDuration } from './Duration/BuildCard-Duration';
import { BuildCardCommit } from './Commit/BuildCard-Commit';
import { BuildCardAuthor } from './Author/BuildCard-Author';
import './BuildCard.scss';

const Card = compose(withCardTypeLink)(CardPresenter);

/**
 * Компонент для создания карточки билда
 */
export const BuildCard: FC<IBuildCardProps> = ({
  branchName,
  commitHash,
  buildNumber,
  commitMessage,
  className,
  date,
  status,
  authorName,
  type,
  to,
  duration,
}) => (
  <Card type={type} to={to} className={cnBuildCard({ status }, [className])}>
    <BuildCardStatus status={status!} />
    <div className={cnBuildCard('Content')}>
      <div className={cnBuildCard('Info')}>
        <div className={cnBuildCard('Row')}>
          <h3 className={cnBuildCard('BuildNumber')}>{buildNumber}</h3>
          <span className={cnBuildCard('Message')}>{commitMessage}</span>
        </div>
        <div className={cnBuildCard('Row')}>
          <BuildCardCommit branchName={branchName!} commitHash={commitHash!} />
          <BuildCardAuthor authorName={authorName!} />
        </div>
      </div>
      <span className={cnBuildCard('Separator')} />
      <div className={cnBuildCard('DateTime')}>
        {date && <BuildCardDate date={date!} />}
        {duration && <BuildCardDuration duration={duration!} />}
      </div>
    </div>
  </Card>
);
