import { AddAccount } from '@/domain/usecases/add-account'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validation'

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

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
