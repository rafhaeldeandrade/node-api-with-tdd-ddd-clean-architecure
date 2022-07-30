import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { MailValidator } from '@/presentation/contracts/mail-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'

export class SignupController implements Controller<httpRequest, httpResponse> {
  constructor(private readonly mailValidator: MailValidator) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    try {
      const requiredParams = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const param of requiredParams) {
        if (!params.body[param as keyof typeof params.body]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { email, password, passwordConfirmation } = params.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const mailIsValid = this.mailValidator.isValid(email)

      if (!mailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: {
          message: 'ok'
        }
      }
    } catch (_error) {
      return serverError()
    }
  }
}
