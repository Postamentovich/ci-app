export interface BuildFinishRequest {
  buildId: string;
  duration: number;
  success: boolean;
  buildLog: string;
}
