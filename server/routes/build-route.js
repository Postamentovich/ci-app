
/**
 * Получение списка сборок
 */
app.get('/api/builds', async (req, res) => {
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
  app.post('/api/builds/:commitHash', (req, res) => {})
  
  /**
   * Получение информации о конкретной сборке
   */
  app.get('/api/builds/:buildId', (req, res) => {})
  
  /**
   * Получение логов билда (сплошной текст)
   */
  app.get('/api/builds/:buildId/logs', (req, res) => {})