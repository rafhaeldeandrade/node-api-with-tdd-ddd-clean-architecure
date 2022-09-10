import { SignupController } from '@/presentation/controllers/signup'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel, AddAccount } from '@/domain/usecases/add-account'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/contracts/validation'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
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

class AddAccountStub implements AddAccount {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const fakeAccount = {
      id: faker.datatype.uuid(),
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    return fakeAccount
  }
}

interface SutTypes {
  sut: SignupController
  addAccountStub: AddAccount
  validationStub: ValidationStub
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const addAccountStub = new AddAccountStub()
  const sut = new SignupController(addAccountStub, validationStub)

  return { sut, addAccountStub, validationStub }
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
    const error = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw error
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(error))
  })

  it('should calls addAccountUseCase with correct params', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  it('should return 403 if the email was previously used to register another account (addAccount returns null)', async () => {
    const { sut, addAccountStub } = makeSut()
    addAccountStub.add = jest.fn().mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('email')))
  })

  it('should return 200 when everything works', async () => {
    const { sut, addAccountStub } = makeSut()
    const fakeAccessToken = faker.datatype.uuid()
    const mockAddResult = {
      id: faker.datatype.uuid(),
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
      accessToken: fakeAccessToken
    }
    JwtAdapter.prototype.encrypt = jest
      .fn()
      .mockResolvedValueOnce(fakeAccessToken)
    addAccountStub.add = jest.fn().mockResolvedValueOnce(mockAddResult)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(mockAddResult))
  })

  it('should call validation with the correct param', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
