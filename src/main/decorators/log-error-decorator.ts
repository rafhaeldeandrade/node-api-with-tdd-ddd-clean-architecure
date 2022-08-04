import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class LogErrorDecoratorController implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    await this.controller.handle(httpRequest)
    return null as unknown as httpResponse
  }
}
