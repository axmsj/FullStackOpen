const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(
    `THE SERVER IS CONNECTED WITH MODULES TO MONGODB ON PORT ${config.PORT}`,
  )
})
