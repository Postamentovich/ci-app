import * as React from 'react';
import { compose } from '@bem-react/core';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeBranch } from 'components/Icon/_type/Icon_type_branch';
import { cnBuildCard } from '../index';

const Icon = compose(withIconTypeBranch)(IconPresenter);

interface BuildCardCommitProps {
  commitHash: string;
  branchName: string;
}

export const BuildCardCommit: React.FC<BuildCardCommitProps> = ({ branchName, commitHash }) => {
  return (
    <div className={cnBuildCard('Commit')}>
      <Icon type="branch" />
      <span className={cnBuildCard('BranchName')}>{branchName}</span>
      <span className={cnBuildCard('CommitHash')}>{commitHash.substr(0, 7)}</span>
    </div>
  );
};
