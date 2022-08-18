import { Authentication } from '@/domain/usecases/authentication'
import { Controller } from '@/presentation/contracts/controller'
import { EmailValidator } from '@/presentation/contracts/email-validator'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import {
  badRequest,
  serverError,
  unauthorized,
  ok
} from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validation'

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!emailIsValid) return badRequest(new InvalidParamError('email'))
      const { email, password } = httpRequest.body
      if (!email) return badRequest(new MissingParamError('email'))
      if (!password) return badRequest(new MissingParamError('password'))
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()
      return ok({ accessToken })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
