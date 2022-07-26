import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignupController {
  async handle(params: httpRequest): Promise<httpResponse | boolean> {
    const requiredParams = ['name', 'email', 'password']

    for (const param of requiredParams) {
      if (!params.body[param as keyof typeof params.body]) {
        return badRequest(new MissingParamError(param))
      }
    }

    return true
  }
}
