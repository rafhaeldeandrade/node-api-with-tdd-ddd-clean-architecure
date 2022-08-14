import { AddAccount } from '@/domain/usecases/add-account'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { EmailValidator } from '@/presentation/contracts/email-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validation'

export class SignupController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccountUseCase: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    try {
      this.validation.validate(params.body)
      const { name, email, password, passwordConfirmation } = params.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const mailIsValid = this.emailValidator.isValid(email)

      if (!mailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccountUseCase.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
