import { Middleware } from '@/presentation/contracts/middleware'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import { badRequest } from '@/presentation/helpers/http/http-helper'
export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly validation: SchemaValidation) {}

  async handle(request: httpRequest): Promise<httpResponse> {
    const error = await this.validation.validate(request.headers)
    if (error) return badRequest(error)
    return null as unknown as httpResponse
  }
}
