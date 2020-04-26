import axios from 'axios';
import { UserSettings } from 'models/UserSettings';
import { UserSettingsResponse } from 'models/UserSettingsResponse';

export const settingsApi = {
  /** Get user settings */
  getSettings: async (): Promise<UserSettingsResponse> => {
    const { data } = await axios.get('/api/settings');
    return data;
  },
  /** Set user settings */
  saveSettings: async (model: UserSettings) => {
    await axios.post('/api/settings', model);
  },
};
