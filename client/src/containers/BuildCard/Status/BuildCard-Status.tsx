import * as React from 'react';
import { BuildStatus } from 'api/models/buildStatus';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { compose, composeU } from '@bem-react/core';
import { withIconTypeSuccess } from 'components/Icon/_type/Icon_type_success';
import { withIconTypeError } from 'components/Icon/_type/Icon_type_error';
import { withIconTypeWaiting } from 'components/Icon/_type/Icon_type_waiting';
import { cnCard } from '../../../components/Card/index';

const Icon = compose(composeU(withIconTypeSuccess, withIconTypeError, withIconTypeWaiting))(IconPresenter);

export interface ButtonStatusProps {
  status: BuildStatus;
}

export const BuildCardStatus: React.SFC<ButtonStatusProps> = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case BuildStatus.InProgress:
      case BuildStatus.Waiting:
        return <Icon type="waiting" />;
      case BuildStatus.Success:
        return <Icon type="success" />;
      case BuildStatus.Canceled:
      case BuildStatus.Fail:
        return <Icon type="error" />;
      default:
        return null;
    }
  };

  return <div className={cnCard('Status')}>{getIcon()}</div>;
};
