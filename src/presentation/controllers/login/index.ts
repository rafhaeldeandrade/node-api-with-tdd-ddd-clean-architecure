import { httpRequest, httpResponse } from '@/presentation/contracts/http'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class LoginController {
  handle(httpRequest: httpRequest): httpResponse {
    return {
      statusCode: 400,
      body: {}
    }
  }
}
