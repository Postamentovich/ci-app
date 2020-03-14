const { Router } = require('express')
const child = require('child_process')
const storageAPI = require('../api/storage-api')

const router = Router()

/**
 * Получение сохраненных настроек
 */
router.get('/', async (req, res) => {
  try {
    const { data } = await storageAPI.getConfig()

    res.json(data)
  } catch (error) {
    console.error(error)

    res.sendStatus(500)
  }
})

/**
 * Сохранение настроек
 */
router.post('/', async (req, res) => {
  try {
    const {
      body: { repoName },
    } = req

    const args = ['clone', `https://github.com/${repoName}`]

    child.spawn('git', args)

    console.log(`${child.stderr}`)

    const { data } = await storageAPI.setConfig(req.body)

    res.json(data)
  } catch (error) {
    console.error(error)

    res.sendStatus(500)
  }
})

module.exports = router
