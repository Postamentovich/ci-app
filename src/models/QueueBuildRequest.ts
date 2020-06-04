export interface QueueBuildRequest {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}
