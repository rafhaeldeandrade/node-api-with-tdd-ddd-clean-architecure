import { httpResponse } from '@/presentation/contracts/http'
import { ServerError } from '@/presentation/errors/server-error'

export function badRequest(error: Error): httpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError(error: Error): httpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error?.stack as string)
  }
}

export function ok(params: any): httpResponse {
  return {
    statusCode: 200,
    body: params
  }
}
