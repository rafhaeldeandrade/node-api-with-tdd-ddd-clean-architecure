import { faker } from '@faker-js/faker'

import { EmailValidator } from '@/presentation/contracts/email-validator'
import { LoginController } from '@/presentation/controllers/login'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/helpers/validation'

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

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true
  }
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
  validationStub: Validation
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new LoginController(
    emailValidatorStub,
    authenticationStub,
    validationStub
  )
  return { sut, emailValidatorStub, authenticationStub, validationStub }
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

  it('should call validateEmail with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
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

  it('should return status 400 if email isnt valid', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(
      badRequest(new InvalidParamError('email'))
    )
  })

  it('should return status 400 if email isnt provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: faker.internet.password()
      }
    }

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(
      badRequest(new MissingParamError('email'))
    )
  })

  it('should return status 400 if password isnt provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(
      badRequest(new MissingParamError('password'))
    )
  })

  it('should return status 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(serverError(new Error()))
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
