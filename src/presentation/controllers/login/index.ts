import { EmailValidator } from '@/presentation/contracts/email-validator'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class LoginController {
  constructor(private readonly emailValidator: EmailValidator) {}
  handle(httpRequest: httpRequest): httpResponse {
    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!emailIsValid) return badRequest(new InvalidParamError('email'))
    const { email, password } = httpRequest.body
    if (!email) return badRequest(new MissingParamError('email'))
    if (!password) return badRequest(new MissingParamError('password'))
    return {
      statusCode: 200,
      body: {}
    }
  }
}
