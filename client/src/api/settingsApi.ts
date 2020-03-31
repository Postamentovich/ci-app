import axios from 'axios';
import { ConfigurationModelHomeworkApiResponse, ConfigurationInput } from './models/models';

export const settingsApi = {
  /** Get user settings */
  getSettings: async (): Promise<ConfigurationModelHomeworkApiResponse> => {
    const { data } = await axios.get('/api/settings');
    return data;
  },
  /** Set user settings */
  saveSettings: async (model: ConfigurationInput) => {
    await axios.post('/api/settings', model);
  },
};
