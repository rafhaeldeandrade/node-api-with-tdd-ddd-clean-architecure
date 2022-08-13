export interface httpRequest {
  body: HttpRequestMessage
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
