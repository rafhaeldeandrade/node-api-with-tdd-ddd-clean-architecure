import { faker } from '@faker-js/faker'

import { EmailValidator } from '@/presentation/contracts/email-validator'
import { LoginController } from '@/presentation/controllers/login'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true
  }
}

function makeSut(): SutTypes {
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
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

  it('should call validateEmail with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return status 400 if email isnt valid', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('should return status 400 if email isnt provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: faker.internet.password()
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return status 400 if password isnt provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
