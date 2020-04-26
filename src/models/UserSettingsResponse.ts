import { UserSettings } from './UserSettings';

export interface UserSettingsResponse {
  data: UserSettings & {
    id: string;
  };
}
