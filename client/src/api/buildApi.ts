import axios from 'axios';
import { BuildModelHomeworkApiResponse, BuildModel } from './models/models';

export const buildApi = {
  /** Get builds list */
  getList: async (): Promise<Array<BuildModel>> => {
    const { data } = await axios.get('/api/builds');
    return data.data;
  },
  /** Get build log */
  getLog: async (buildId: string): Promise<string> => {
    const { data } = await axios.get(`/api/builds/${buildId}/logs`);
    return data;
  },
  /** Get build details */
  getDetails: async (buildId: string): Promise<BuildModel> => {
    const { data } = await axios.get(`/api/builds/${buildId}`);
    return data;
  },
  /** Add build to queue */
  addBuild: async (commitHash: string): Promise<BuildModel> => {
    const { data } = await axios.post(`/api/builds/${commitHash}`);
    return data;
  },
};
