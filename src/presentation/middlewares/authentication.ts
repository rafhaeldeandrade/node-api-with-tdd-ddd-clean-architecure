import { Middleware } from '@/presentation/contracts/middleware'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
export class AuthenticationMiddleware implements Middleware {
  async handle(request: httpRequest): Promise<httpResponse> {
    return null as unknown as httpResponse
  }
}
