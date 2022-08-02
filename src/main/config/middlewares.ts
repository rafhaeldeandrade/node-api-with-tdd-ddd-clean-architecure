import { Express } from 'express'
import { bodyParser } from '@/main/middlewares/body-parser'
import { corsMiddleware } from '@/main/middlewares/cors'

export function setupMiddlewares(app: Express): void {
  app.use(bodyParser)
  app.use(corsMiddleware)
}
