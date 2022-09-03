import { AddAccount } from '@/domain/usecases/add-account'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/contracts/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class SignupController implements Controller {
  constructor(
    private readonly addAccountUseCase: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(params.body)
      if (error) return badRequest(error)
      const { name, email, password } = params.body
      const account = await this.addAccountUseCase.add({
        name,
        email,
        password
      })
      const emailWasUsedBefore = !account
      if (emailWasUsedBefore) return forbidden(new InvalidParamError('email'))
      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
