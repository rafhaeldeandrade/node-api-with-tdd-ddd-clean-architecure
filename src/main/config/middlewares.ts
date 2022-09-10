import { Express } from 'express'
import { bodyParser } from '@/main/middlewares/body-parser'
import { corsMiddleware } from '@/main/middlewares/cors'
import { urlEncoded } from '@/main/middlewares/urlencoded'

export function setupMiddlewares(app: Express): void {
  app.use(bodyParser)
  app.use(urlEncoded)
  app.use(corsMiddleware)
}
