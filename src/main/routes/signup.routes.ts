import { Request, Response, Router } from 'express'

export default function (router: Router): void {
  router.post('/signup', (_req: Request, res: Response) => {
    res.json({ message: 'ok' })
  })
}
