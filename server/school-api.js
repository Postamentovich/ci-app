const axios = require('axios').default
const https = require('https')

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const schoolAPI = {
  setConfig: async model => {
    try {
      const result = await api.post('conf', model)
      return result
    } catch (error) {
      console.error(error)
    }
  },
  getConfig: async () => {
    const { data } = await api.get('conf')
    console.log(data)
    return data
  },
}

module.exports = schoolAPI
