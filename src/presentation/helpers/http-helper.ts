import { httpResponse } from '@/presentation/contracts/http'

export function badRequest(error: Error): httpResponse {
  return {
    statusCode: 400,
    body: error
  }
}
