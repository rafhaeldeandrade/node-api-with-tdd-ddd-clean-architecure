import { Middleware } from '@/presentation/contracts/middleware'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { Roles } from '@/domain/models/account'

export class AuthenticationMiddleware implements Middleware {
  constructor(
    private readonly validation: SchemaValidation,
    private readonly authorizedRoles: Roles[],
    private readonly loadAccountByTokenUseCase: LoadAccountByToken
  ) {}

  async handle(request: httpRequest): Promise<httpResponse> {
    try {
      const { headers } = request
      const error = await this.validation.validate({
        headers,
        authorizedRoles: this.authorizedRoles
      })
      if (error) return badRequest(error)
      const accessToken = headers?.['x-access-token'] as string
      const account = await this.loadAccountByTokenUseCase.load(accessToken)
      if (!account || !this.authorizedRoles.includes(account.role)) {
        return unauthorized()
      }
      return ok({
        id: account.id,
        role: account.role
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
