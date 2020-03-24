import axios from 'axios';

const settingsApi = {
  getSettings: () => axios.get('/api/settings'),
};

export default settingsApi;
