import { Middleware } from '@/presentation/contracts/middleware'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly validation: SchemaValidation) {}

  async handle(request: httpRequest): Promise<httpResponse> {
    await this.validation.validate(request.headers)
    return null as unknown as httpResponse
  }
}
