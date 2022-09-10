import * as Sentry from '@sentry/node'
import { mongooseHelper } from '@/infra/database/mongoose/helpers/mongoose-helper'
import { app } from '@/main/config/app'
import env from '@/main/config/env'
import('@sentry/tracing')

const PORT = env.apiPort
const MONGO_URL = env.mongoUrl

mongooseHelper
  .connect(MONGO_URL)
  .then(() => {
    Sentry.init({
      dsn: env.sentryDsn
    })
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  )
  .catch(console.error)
