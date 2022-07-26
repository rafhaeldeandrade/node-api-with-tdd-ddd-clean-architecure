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
  body?: {
    [key: string]: any
  }
}
