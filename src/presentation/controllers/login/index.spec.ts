import { faker } from '@faker-js/faker'

import { EmailValidator } from '@/presentation/contracts/email-validator'
import { LoginController } from '@/presentation/controllers/login'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'

const fakeParams = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

class AuthenticationStub implements Authentication {
  async auth(params: AuthenticationModel): Promise<string> {
    return faker.datatype.uuid()
  }
}

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true
  }
}

function makeSut(): SutTypes {
  const authenticationStub = new AuthenticationStub()
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return { sut, emailValidatorStub, authenticationStub }
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
    const httpRequest = fakeParams

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(serverError(new Error()))
  })

  it('should call authentication with the correct params', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = fakeParams

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledTimes(1)
    expect(authSpy).toHaveBeenCalledWith(fakeParams.body)
  })
})
