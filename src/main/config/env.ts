import argon2 from 'argon2'
import * as dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
})

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/node-clean-api',
  apiPort: process.env.PORT ?? '4000',
  jwtSecret: process.env.JWT_SECRET as string,
  argon2Options: {
    type: argon2.argon2id,
    memoryCost: 37888,
    parallelism: 1,
    timeCost: 2
  }
}
