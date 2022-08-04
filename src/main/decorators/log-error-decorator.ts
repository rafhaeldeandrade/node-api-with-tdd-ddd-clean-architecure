import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class LogErrorDecoratorController implements Controller {
  async handle(request: httpRequest): Promise<httpResponse> {
    return null as unknown as httpResponse
  }
}
