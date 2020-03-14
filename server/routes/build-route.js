const { Router } = require('express')
const storageAPI = require('../api/storage-api')

const router = Router()

/**
 * Получение списка сборок
 */
router.get('/', async (req, res) => {
  try {
    const { data } = await storageAPI.getBuildList()
    console.log('result', data)
    res.send(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

/**
 * Добавление сборки в очередь
 */
router.post('/:commitHash', (req, res) => {})

/**
 * Получение информации о конкретной сборке
 */
router.get('/:buildId', (req, res) => {})

/**
 * Получение логов билда (сплошной текст)
 */
router.get('/:buildId/logs', (req, res) => {})

module.exports = router
