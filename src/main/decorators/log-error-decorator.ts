import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class LogErrorDecoratorController implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    return httpResponse
  }
}
