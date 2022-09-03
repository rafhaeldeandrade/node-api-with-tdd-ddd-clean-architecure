import { httpResponse } from '@/presentation/contracts/http'
import { ServerError } from '@/presentation/errors/server-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'

export function badRequest(
  error: MissingParamError | InvalidParamError
): httpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function unauthorized(): httpResponse {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export function forbidden(error: Error): httpResponse {
  return {
    statusCode: 403,
    body: error
  }
}

export function serverError(error: Error): httpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack as string)
  }
}

export function ok(params: any): httpResponse {
  return {
    statusCode: 200,
    body: params
  }
}
