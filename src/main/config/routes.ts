import { Express, Router } from 'express'
import fs from 'fs'
import path from 'path'

export async function setupRoutes(app: Express): Promise<void> {
  const router = Router()
  app.use('/api', router)

  const files = fs.readdirSync(path.resolve(__dirname, '../routes'))

  files.map(async (file) => {
    if (file.endsWith('.routes.ts')) {
      const { default: route } = await import(`../routes/${file}`)
      route(router)
    }
  })
}
