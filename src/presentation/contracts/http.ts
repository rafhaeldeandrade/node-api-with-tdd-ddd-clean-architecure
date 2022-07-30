export interface httpRequest {
  body: {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

export interface httpResponse {
  statusCode: number
  body?: Error | HttpResponseMessage
}

interface HttpResponseMessage {
  [key: string]: any
}
