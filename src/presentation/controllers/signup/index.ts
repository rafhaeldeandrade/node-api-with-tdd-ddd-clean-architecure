import {
  httpRequest,
  httpResponse
} from '@/presentation/contracts/http-contracts'

export class SignupController {
  async handle(params: httpRequest): Promise<httpResponse> {
    if (!params.body?.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!params.body?.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    return await Promise.resolve({ statusCode: 200 })
  }
}
