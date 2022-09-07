import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { Validation } from '@/presentation/contracts/validation'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class AddPostController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    const error = this.validation.validate(params.body)
    if (error) return badRequest(error)
    return '' as unknown as httpResponse
  }
}
