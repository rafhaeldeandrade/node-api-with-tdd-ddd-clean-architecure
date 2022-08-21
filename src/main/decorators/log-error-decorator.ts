import { LogErrorRepository } from '@/data/contracts/db/log-error-repository'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class LogErrorDecoratorController implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse?.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse?.body?.stack)
    }
    return httpResponse
  }
}
