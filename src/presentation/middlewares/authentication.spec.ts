import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'

interface SutTypes {
  sut: AuthenticationMiddleware
}

function makeSut(): SutTypes {
  const sut = new AuthenticationMiddleware()
  return { sut }
}

describe('Authentication Middleware', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
