import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/node-clean-api',
  apiPort: process.env.API_PORT ?? '4000'
}
