import { httpResponse } from '../contracts/http'

export function badRequest(error: Error): httpResponse {
  return {
    statusCode: 400,
    body: error
  }
}
