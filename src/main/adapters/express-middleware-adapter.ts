import { NextFunction, Request, Response } from 'express'
import { Middleware } from '@/presentation/contracts/middleware'

export function adaptMiddleware(middlware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers as any,
      body: req.body
    }
    const httpResponse = await middlware.handle(httpRequest)
    if (httpResponse.statusCode !== 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    Object.assign(req, httpResponse)
    next()
  }
}
