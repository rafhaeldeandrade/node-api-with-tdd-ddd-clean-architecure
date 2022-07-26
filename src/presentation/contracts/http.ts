export interface httpRequest {
  body: {
    name: string
    email: string
  }
}

export interface httpResponse {
  statusCode: number
  body?: {
    [key: string]: any
  }
}
