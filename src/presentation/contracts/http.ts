export interface httpRequest {
  body: HttpRequestMessage
  headers?: HttpRequestHeaders
}

export interface httpResponse {
  statusCode: number
  body: Error | HttpResponseMessage
}

interface HttpResponseMessage {
  [key: string]: any
}

interface HttpRequestMessage {
  [key: string]: any
}

interface HttpRequestHeaders {
  'x-access-token'?: string
}
