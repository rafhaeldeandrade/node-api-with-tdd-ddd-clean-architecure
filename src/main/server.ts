import { mongooseHelper } from '@/infra/database/mongoose/helpers/mongoose-helper'
import { app } from '@/main/config/app'
import env from '@/main/config/env'

const PORT = env.apiPort
const MONGO_URL = env.mongoUrl

mongooseHelper
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  )
  .catch(console.error)
