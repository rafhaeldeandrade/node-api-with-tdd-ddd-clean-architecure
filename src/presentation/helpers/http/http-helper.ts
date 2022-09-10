import { httpResponse } from '@/presentation/contracts/http'
import { ServerError } from '@/presentation/errors/server-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'

interface BodyError {
  [key: string]: string
}

function returnBodyError(error: Error): BodyError {
  return {
    [error.name]: error.message
  }
}

export function badRequest(
  error: MissingParamError | InvalidParamError
): httpResponse {
  return {
    statusCode: 400,
    body: returnBodyError(error)
  }
}

export function unauthorized(): httpResponse {
  const unauthorizedError = new UnauthorizedError()
  return {
    statusCode: 401,
    body: returnBodyError(unauthorizedError)
  }
}

export function forbidden(error: Error): httpResponse {
  return {
    statusCode: 403,
    body: returnBodyError(error)
  }
}

export function conflict(error: Error): httpResponse {
  return {
    statusCode: 409,
    body: returnBodyError(error)
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

export function created(params: any): httpResponse {
  return {
    statusCode: 201,
    body: params
  }
}
