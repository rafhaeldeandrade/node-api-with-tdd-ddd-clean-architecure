import { LogErrorRepository } from '@/data/contracts/database/log-error-repository'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class LogErrorDecoratorController implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode !== 500) return httpResponse
    await this.logErrorRepository.logError(httpResponse.body.stack)
    return {
      ...httpResponse,
      body: { [httpResponse.body.name]: httpResponse.body.message }
    }
  }
}
