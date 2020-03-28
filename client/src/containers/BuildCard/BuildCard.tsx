import React, { FC } from 'react';
import './BuildCard.scss';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { compose, composeU } from '@bem-react/core';
import { withIconTypeBranch } from 'components/Icon/_type/Icon_type_branch';
import { withIconTypeUser } from 'components/Icon/_type/Icon_type_user';
import { withIconTypeCalendar } from 'components/Icon/_type/Icon_type_calendar';
import { withIconTypeTime } from 'components/Icon/_type/Icon_type_time';
import { Card as CardPresenter } from 'components/Card/Card';
import { IBuildCardProps, cnBuildCard } from './index';
import { BuildCardStatus } from './Status/BuildCard-Status';
import { withCardTypeLink } from 'components/Card/_type/Card_type_link';
import { BuildCardDate } from './Date/BuildCard-Date';
import { BuildCardDuration } from './Duration/BuildCard-Duration';

const Icon = compose(composeU(withIconTypeBranch, withIconTypeTime, withIconTypeUser, withIconTypeCalendar))(
  IconPresenter,
);

const Card = compose(withCardTypeLink)(CardPresenter);

export const BuildCard: FC<IBuildCardProps> = ({
  branchName,
  commitHash,
  taskId,
  message,
  className,
  date,
  status,
  authorName,
  duration,
  as: Component = 'div',
  ...props
}) => (
  <Card {...props} className={cnBuildCard({}, [className])}>
    <BuildCardStatus status={status!} />
    <div className={cnBuildCard('Content')}>
      <div className={cnBuildCard('Info')}>
        <div className={cnBuildCard('Row')}>
          <h3 className={cnBuildCard('TaskId')}>{taskId}</h3>
          <span className={cnBuildCard('Message')}>{message}</span>
        </div>
        <div className={cnBuildCard('Row')}>
          <div className={cnBuildCard('Branch')}>
            <Icon type="branch" />
            <span className={cnBuildCard('Branc0hName')}>{branchName}</span>
            <span className={cnBuildCard('CommitHash')}>{commitHash}</span>
          </div>
          <div className={cnBuildCard('Author')}>
            <Icon type="user" />
            <span className={cnBuildCard('AuthorName')}>{authorName}</span>
          </div>
        </div>
      </div>
      <span className={cnBuildCard('Separator')} />
      <div className={cnBuildCard('DateTime')}>
        <BuildCardDate date={date!} />
        <BuildCardDuration duration={duration!} />
      </div>
    </div>
  </Card>
);
