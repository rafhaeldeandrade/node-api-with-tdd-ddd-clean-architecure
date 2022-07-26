import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignupController {
  async handle(params: httpRequest): Promise<httpResponse> {
    if (!params.body?.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!params.body?.email) {
      return badRequest(new MissingParamError('email'))
    }

    return await Promise.resolve({ statusCode: 200 })
  }
}
