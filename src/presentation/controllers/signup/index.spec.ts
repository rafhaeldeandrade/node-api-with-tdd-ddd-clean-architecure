import { SignupController } from '@/presentation/controllers/signup'
import { faker } from '@faker-js/faker'

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
    const sut = new SignupController()

    expect(sut).toBeDefined()
  })

  it('should have an method called handle', () => {
    const sut = new SignupController()

    expect(sut.handle).toBeDefined()
  })

  it('should return status 400 when email is not provided', async () => {
    const sut = new SignupController()

    const promise = await sut.handle(httpRequest as any)

    const httpResponse = { body: { statusCode: 400 } }

    expect(promise).toEqual(httpResponse)
  })
})
