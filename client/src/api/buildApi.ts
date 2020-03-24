import axios from 'axios';
import { BuildModelArrayHomeworkApiResponse, BuildModelHomeworkApiResponse } from './models/models';

const buildApi = {
  /** Get builds list */
  getList: async (): Promise<BuildModelArrayHomeworkApiResponse> => {
    const { data } = await axios.get('/api/builds');
    return data;
  },
  /** Get build log */
  getLog: async (buildId: string): Promise<string> => {
    const { data } = await axios.get(`/api/builds/${buildId}/log`);
    return data;
  },
  /** Get build details */
  getDetails: async (buildId: string): Promise<BuildModelHomeworkApiResponse> => {
    const { data } = await axios.get(`/api/builds/${buildId}`);
    return data;
  },
  /** Add build to queue */
  addBuild: async (commitHash: string) => {
    await axios.post(`/api/builds/${commitHash}`);
  },
};

export default buildApi;
