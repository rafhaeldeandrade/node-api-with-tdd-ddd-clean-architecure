import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export class AddPostController implements Controller {
  async handle(params: httpRequest): Promise<httpResponse> {
    return '' as unknown as httpResponse
  }
}
