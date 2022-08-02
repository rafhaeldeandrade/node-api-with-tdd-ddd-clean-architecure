import { app } from '@/main/config/app'
import env from '@/main/config/env'
import mongoose from 'mongoose'

const PORT = env.apiPort
const MONGO_URL = env.mongoUrl

mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  )
  .catch(console.error)
