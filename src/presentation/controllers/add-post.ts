import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { Validation } from '@/presentation/contracts/validation'

export class AddPostController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    this.validation.validate(params.body)
    return '' as unknown as httpResponse
  }
}
