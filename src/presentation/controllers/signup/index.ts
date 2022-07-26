import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class SignupController {
  async handle(params: httpRequest): Promise<httpResponse> {
    if (!params.body?.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!params.body?.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return await Promise.resolve({ statusCode: 200 })
  }
}
