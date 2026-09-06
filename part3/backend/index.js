require('dotenv').config()
const app = require('./app') // the express app
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Serving running on port ${config.PORT}`)
})
