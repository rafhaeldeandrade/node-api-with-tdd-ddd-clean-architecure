interface httpHelper {
  statusCode: number
  body: Error
}

export function badRequest(error: Error): httpHelper {
  return {
    statusCode: 400,
    body: error
  }
}
