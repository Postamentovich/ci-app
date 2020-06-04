import axios from 'axios';
import https from 'https';
import { BuildListResponse } from 'models/BuildListResponse';
import { BuildDetailsResponse } from 'models/BuildDetailsResponse';
import { QueueBuildRequest } from 'models/QueueBuildRequest';
import { QueueBuildResponse } from 'models/QueueBuildResponse';
import { BuildStartRequest } from 'models/BuildStartRequest';
import { BuildFinishRequest } from 'models/BuildFinishRequest';
import { BuildCancelRequest } from 'models/BuildCancelRequest';
import { UserSettingsResponse } from 'models/UserSettingsResponse';
import { UserSettings } from 'models/UserSettings';

export const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const storageAPI = {
  getBuildList: (offset = 0, limit = 25) => {
    const params = new URLSearchParams();
    params.set('offset', String(offset));
    params.set('limit', String(limit));
    return api.get<BuildListResponse>('build/list', { params });
  },

  getBuildLog: (buildId: string) => {
    const params = new URLSearchParams();
    if (buildId) params.set('buildId', buildId);
    return api.get<string>('build/log', { params });
  },

  getBuildDetails: (buildId: string) => {
    const params = new URLSearchParams();
    if (buildId) params.set('buildId', buildId);
    return api.get<BuildDetailsResponse>('build/details', { params });
  },

  setBuildRequest: (model: QueueBuildRequest) =>
    api.post<QueueBuildResponse>('build/request', model),

  setBuildStart: (model: BuildStartRequest) => api.post('build/start', model),

  setBuildFinish: (model: BuildFinishRequest) => api.post('build/finish', model),

  setBuildCancel: (model: BuildCancelRequest) => api.post('build/cancel', model),

  getConfig: () => api.get<UserSettingsResponse>('conf'),

  setConfig: (model: UserSettings) => api.post('conf', model),

  deleteConfig: () => api.delete('conf'),
};
