const axios = require('axios').default
const https = require('https')

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const storageAPI = {
  getBuildList: (offset = 0, limit = 25) => {
    const params = new URLSearchParams()
    params.set('offset', offset)
    params.set('limit', limit)
    return api.get('build/list')
  },
  setConfig: async model => api.post('conf', model),
  getConfig: async () => api.get('conf'),
  deleteConfig: async () => api.delete('conf'),
}

module.exports = storageAPI
