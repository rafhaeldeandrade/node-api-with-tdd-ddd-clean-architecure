import { httpResponse, httpRequest } from '@/presentation/contracts/http'

export interface Middleware {
  handle: (request: httpRequest) => Promise<httpResponse>
}
