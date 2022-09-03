import { Controller } from '@/presentation/contracts/controller'
import { Request, Response } from 'express'

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
