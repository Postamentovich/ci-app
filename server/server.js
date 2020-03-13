const express = require('express')
require('dotenv').config()
const storageAPI = require('./storage-api')

const app = express()

app.use(express.json())

/**
 * Получение сохраненных настроек
 */
app.get('/api/settings', async (req, res) => {
  try {
    const config = await storageAPI.getConfig()

    res.json(config)
  } catch (error) {
    console.error(error)

    res.status(500)

    res.end()
  }
})

/**
 * Сохранение настроек
 */
app.post('/api/settings', async (req, res) => {
  try {
    console.log('body', req.body)
    const result = storageAPI.setConfig(req.body)
    res.status(200)

    res.json(result)
  } catch (error) {
    console.error(error)

    res.status(500)

    res.end()
  }
})

/**
 * Получение списка сборок
 */
app.get('/api/builds', async (req, res) => {
  try {
    const result = await storageAPI.getBuildList()
    res.send(result)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

/**
 * Добавление сборки в очередь
 */
app.post('/api/builds/:commitHash', (req, res) => {})

/**
 * Получение информации о конкретной сборке
 */
app.get('/api/builds/:buildId', (req, res) => {})

/**
 * Получение логов билда (сплошной текст)
 */
app.get('/api/builds/:buildId/logs', (req, res) => {})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`)
})
