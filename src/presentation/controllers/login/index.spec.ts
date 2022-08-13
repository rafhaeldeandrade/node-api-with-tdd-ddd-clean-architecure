import { LoginController } from '@/presentation/controllers/login'

interface SutTypes {
  sut: LoginController
}

function makeSut(): SutTypes {
  const sut = new LoginController()
  return { sut }
}

describe('LoginController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called handle', () => {
    const { sut } = makeSut()

    expect(sut.handle).toBeDefined()
  })

  it('should return status 400 if email isnt provided', () => {
    const { sut } = makeSut()

    const httpResponse = sut.handle({} as any)

    expect(httpResponse.statusCode).toBe(400)
  })
})
