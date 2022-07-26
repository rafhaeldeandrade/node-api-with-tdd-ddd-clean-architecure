import { SignupController } from '@/presentation/controllers/signup'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

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
    email: faker.internet.email(),
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

  it('should return status 400 when name is not provided', async () => {
    const { sut } = makeSut()

    const {
      body: { name, ...httpRequestParams }
    } = httpRequest
    const promise = await sut.handle({ body: httpRequestParams } as any)

    const httpResponse = {
      statusCode: 400,
      body: new MissingParamError('name')
    }

    expect(promise).toEqual(httpResponse)
  })

  it('should return status 400 when email is not provided', async () => {
    const { sut } = makeSut()

    const {
      body: { email, ...httpRequestParams }
    } = httpRequest
    const promise = await sut.handle({ body: httpRequestParams } as any)

    const httpResponse = {
      statusCode: 400,
      body: new MissingParamError('email')
    }

    expect(promise).toEqual(httpResponse)
  })
})
