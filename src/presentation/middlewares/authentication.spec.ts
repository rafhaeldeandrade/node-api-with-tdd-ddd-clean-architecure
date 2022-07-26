import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { faker } from '@faker-js/faker'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import {
  badRequest,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import { AccountModel, Roles } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

const fakeAccount: AccountModel = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  accessToken: faker.datatype.uuid(),
  role: faker.helpers.arrayElement(['admin', 'moderator', 'writer'])
}

class ValidationStub implements SchemaValidation {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

class LoadAccountByTokenUseCaseStub implements LoadAccountByToken {
  async load(token: string): Promise<AccountModel> {
    return fakeAccount
  }
}

interface SutTypes {
  sut: AuthenticationMiddleware
  validationStub: SchemaValidation
  authorizedRoles: Roles[]
  loadAccountByTokenUseCaseStub: LoadAccountByToken
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const authorizedRoles: Roles[] = ['admin', 'moderator', 'writer']
  const loadAccountByTokenUseCaseStub = new LoadAccountByTokenUseCaseStub()
  const sut = new AuthenticationMiddleware(
    validationStub,
    authorizedRoles,
    loadAccountByTokenUseCaseStub
  )
  return { sut, validationStub, authorizedRoles, loadAccountByTokenUseCaseStub }
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
    const { sut, validationStub, authorizedRoles } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(fakeHttpRequest)

    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      headers: fakeHttpRequest.headers,
      authorizedRoles
    })
  })

  it('should return 400 if validation.validate returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    validationStub.validate = jest.fn().mockResolvedValueOnce(error)

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(badRequest(error))
  })

  it('should return 500 if validation.validate throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    error.stack = 'any_stack'
    validationStub.validate = jest.fn().mockImplementationOnce(async () => {
      throw error
    })

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(serverError(error))
  })

  it('should call loadAccountByTokenUseCase.load with correct param if x-access-token is provided', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    const loadSpy = jest
      .spyOn(loadAccountByTokenUseCaseStub, 'load')
      .mockResolvedValueOnce({} as unknown as AccountModel)

    await sut.handle(fakeHttpRequest)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(
      fakeHttpRequest.headers['x-access-token']
    )
  })

  it('should call loadAccountByTokenUseCase.load with correct param if x-access-token is not provided', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    const loadSpy = jest
      .spyOn(loadAccountByTokenUseCaseStub, 'load')
      .mockResolvedValueOnce({} as unknown as AccountModel)

    const { headers, ...fakeHttpRequestWithoutHeaders } = fakeHttpRequest
    await sut.handle(fakeHttpRequestWithoutHeaders)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(undefined)
  })

  it('should return 500 if loadAccountByTokenUseCase.load throws', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    const error = new Error('any_error')
    error.stack = 'any_stack'
    loadAccountByTokenUseCaseStub.load = jest
      .fn()
      .mockImplementationOnce(async () => {
        throw error
      })

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(serverError(error))
  })

  it('should return 401 if loadAccountByTokenUseCase returns null (account not found)', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    loadAccountByTokenUseCaseStub.load = jest.fn().mockResolvedValueOnce(null)

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(unauthorized())
  })

  it('should return 401 if loadAccountByTokenUseCase returns an account but its role doesnt fit authorizedRoles', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    loadAccountByTokenUseCaseStub.load = jest.fn().mockResolvedValueOnce({
      ...fakeAccount,
      role: 'reader'
    })

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual(unauthorized())
  })

  it('should return 200 with id and role on success', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    loadAccountByTokenUseCaseStub.load = jest
      .fn()
      .mockResolvedValueOnce(fakeAccount)

    const promise = sut.handle(fakeHttpRequest)

    await expect(promise).resolves.toEqual({
      statusCode: 200,
      body: {
        id: fakeAccount.id,
        role: fakeAccount.role
      }
    })
  })
})
