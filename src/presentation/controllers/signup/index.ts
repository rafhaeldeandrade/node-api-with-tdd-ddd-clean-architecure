import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignupController implements Controller<httpRequest, httpResponse> {
  async handle(params: httpRequest): Promise<httpResponse> {
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']

    for (const param of requiredParams) {
      if (!params.body[param as keyof typeof params.body]) {
        return badRequest(new MissingParamError(param))
      }
    }

    if (params.body.password !== params.body.passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    return {
      statusCode: 200,
      body: {
        message: 'ok'
      }
    }
  }
}
