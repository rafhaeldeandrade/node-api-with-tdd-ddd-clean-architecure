import { httpRequest, httpResponse } from '@/presentation/contracts/http'

export interface Controller {
  handle: (request: httpRequest) => Promise<httpResponse>
}
