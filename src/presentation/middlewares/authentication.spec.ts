import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { faker } from '@faker-js/faker'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import { badRequest } from '@/presentation/helpers/http/http-helper'

class ValidationStub implements SchemaValidation {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: AuthenticationMiddleware
  validationStub: SchemaValidation
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const sut = new AuthenticationMiddleware(validationStub)
  return { sut, validationStub }
}

const fakeAccessToken = faker.datatype.uuid()
const fakeHttpRequest = {
  body: {},
  headers: {
    'x-access-token': fakeAccessToken
  }
}

describe('Authentication Middleware', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called handle', () => {
    const { sut } = makeSut()

    expect(sut.handle).toBeDefined()
  })

  it('should call validation.validate with correct param', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(fakeHttpRequest)

    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.headers)
  })

  it('should return 400 if validation.validate returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    validationStub.validate = jest.fn().mockReturnValueOnce(error)

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(badRequest(error))
  })
})
