import { faker } from '@faker-js/faker'

import { LoginController } from '@/presentation/controllers/login'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/contracts/validation'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

const fakeAccessToken = faker.datatype.uuid()
class AuthenticationStub implements Authentication {
  async auth(params: AuthenticationModel): Promise<string> {
    return fakeAccessToken
  }
}

interface SutTypes {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return { sut, authenticationStub, validationStub }
}

const httpRequest = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
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

  it('should call validation with the correct param', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('any_field'))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')))
  })

  it('should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call authentication with the correct params', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledTimes(1)
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return status 401 if user credentials are invalid', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(async () => null as any)

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(unauthorized())
  })

  it('should return status 500 if authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(serverError(new Error()))
  })

  it('should return status 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({ accessToken: fakeAccessToken }))
  })
})
