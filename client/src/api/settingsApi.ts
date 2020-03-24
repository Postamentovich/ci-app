import axios from 'axios';
import { ConfigurationModelHomeworkApiResponse } from './models/models';

const settingsApi = {
  getSettings: async (): Promise<ConfigurationModelHomeworkApiResponse> => {
    const { data } = await axios.get('/api/settings');
    return data;
  },
};

export default settingsApi;
