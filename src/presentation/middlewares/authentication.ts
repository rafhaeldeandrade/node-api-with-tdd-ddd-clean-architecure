import { Middleware } from '@/presentation/contracts/middleware'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
export class AuthenticationMiddleware implements Middleware {
  constructor(
    private readonly validation: SchemaValidation,
    private readonly loadAccountByTokenUseCase: LoadAccountByToken
  ) {}

  async handle(request: httpRequest): Promise<httpResponse> {
    const { headers } = request
    const error = await this.validation.validate(headers)
    if (error) return badRequest(error)
    await this.loadAccountByTokenUseCase.load(
      headers ? headers['x-access-token'] : ''
    )
    return null as unknown as httpResponse
  }
}
