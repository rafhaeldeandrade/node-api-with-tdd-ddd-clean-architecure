import { SignupController } from '@/presentation/controllers/signup'
import { faker } from '@faker-js/faker'

interface makeSutInterface {
  sut: SignupController
}

function makeSut(): makeSutInterface {
  const sut = new SignupController()

  return { sut }
}

const fakePassword = faker.internet.password()
const httpRequest = {
  body: {
    name: faker.name.findName(),
    password: fakePassword,
    passwordConfirmation: fakePassword
  }
}

describe('SignupController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have an method called handle', () => {
    const { sut } = makeSut()

    expect(sut.handle).toBeDefined()
  })

  it('should return status 400 when email is not provided', async () => {
    const { sut } = makeSut()

    const promise = await sut.handle(httpRequest as any)

    const httpResponse = { statusCode: 400 }

    expect(promise).toEqual(httpResponse)
  })
})
