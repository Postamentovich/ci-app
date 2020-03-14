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
