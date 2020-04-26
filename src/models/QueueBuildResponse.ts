import { BuildStatus } from './BuildStatus';

export interface QueueBuildResponse {
  id: string;
  buildNumber: number;
  status: BuildStatus;
}
