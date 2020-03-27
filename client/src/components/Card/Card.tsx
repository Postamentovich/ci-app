import React, { FC } from 'react';
import './Card.scss';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { compose, composeU } from '@bem-react/core';
import { withIconTypeBranch } from 'components/Icon/_type/Icon_type_branch';
import { ICardProps, cnCard } from './index';
import { withIconTypeUser } from 'components/Icon/_type/Icon_type_user';
import { withIconTypeCalendar } from 'components/Icon/_type/Icon_type_calendar';
import { withIconTypeTime } from 'components/Icon/_type/Icon_type_time';

const Icon = compose(composeU(withIconTypeBranch, withIconTypeTime, withIconTypeUser, withIconTypeCalendar))(
  IconPresenter,
);

export const Card: FC<ICardProps> = ({
  branchName,
  commitHash,
  taskId,
  message,
  className,
  date,
  authorName,
  duration,
  statusIcon,
  as: Component = 'div',
  ...props
}) => (
  <Component {...props} className={cnCard({}, [className])}>
    <div className={cnCard('Status')}>{statusIcon}</div>
    <div className={cnCard('Content')}>
      <div className={cnCard('Info')}>
        <div className={cnCard('Row')}>
          <h3 className={cnCard('TaskId')}>{taskId}</h3>
          <span className={cnCard('Message')}>{message}</span>
        </div>
        <div className={cnCard('Row')}>
          <div className={cnCard('Branch')}>
            <Icon type="branch" />
            <span className={cnCard('BranchName')}>{branchName}</span>
            <span className={cnCard('CommitHash')}>{commitHash}</span>
          </div>
          <div className={cnCard('Author')}>
            <Icon type="user" />
            <span className={cnCard('AuthorName')}>{authorName}</span>
          </div>
        </div>
      </div>
      <span className={cnCard('Separator')} />
      <div className={cnCard('DateTime')}>
        <div className={cnCard('Date')}>
          <Icon type="calendar" />
          <span className={cnCard('DateTimeItem')}>{date}</span>
        </div>
        <div className={cnCard('Time')}>
          <Icon type="time" />
          <span className={cnCard('DateTimeItem')}>{duration}</span>
        </div>
      </div>
    </div>
  </Component>
);
