import { BuildStatus } from './BuildStatus';

export interface BuildModel {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: BuildStatus;
  start?: string;
  duration?: number;
}
