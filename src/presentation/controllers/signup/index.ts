import {
  httpRequest,
  httpResponse
} from '@/presentation/contracts/http-contracts'

export class SignupController {
  async handle(params: httpRequest): Promise<httpResponse> {
    return await Promise.resolve({ statusCode: 400 })
  }
}
