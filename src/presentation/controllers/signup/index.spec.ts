import { SignupController } from '@/presentation/controllers/signup'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { EmailValidator } from '@/presentation/contracts/email-validator'
import { ServerError } from '@/presentation/errors/server-error'
import { AccountModel } from '@/domain/models/account'
import {
  AddAccountModel,
  AddAccountUseCase
} from '@/presentation/usecases/add-account'

interface makeSutInterface {
  sut: SignupController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccountUseCase
}

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true
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

class AddAccountStub implements AddAccountUseCase {
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

function makeSut(): makeSutInterface {
  const emailValidatorStub = new EmailValidatorStub()
  const addAccountStub = new AddAccountStub()
  const sut = new SignupController(emailValidatorStub, addAccountStub)

  return { sut, emailValidatorStub, addAccountStub }
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

  it('should return status 400 when password is not provided', async () => {
    const { sut } = makeSut()

    const {
      body: { password, ...httpRequestParams }
    } = httpRequest
    const promise = await sut.handle({ body: httpRequestParams } as any)

    const httpResponse = {
      statusCode: 400,
      body: new MissingParamError('password')
    }

    expect(promise).toEqual(httpResponse)
  })

  it('should return status 400 when passwordConfirmation is not provided', async () => {
    const { sut } = makeSut()

    const {
      body: { passwordConfirmation, ...httpRequestParams }
    } = httpRequest
    const promise = await sut.handle({ body: httpRequestParams } as any)

    const httpResponse = {
      statusCode: 400,
      body: new MissingParamError('passwordConfirmation')
    }

    expect(promise).toEqual(httpResponse)
  })

  it('should return 400 when password is different from passwordConfirmation', async () => {
    const { sut } = makeSut()

    const {
      body: { password, passwordConfirmation, ...httpRequestParams }
    } = httpRequest
    const promise = await sut.handle({
      body: {
        ...httpRequestParams,
        password: faker.internet.password(4),
        passwordConfirmation: faker.internet.password(5)
      }
    } as any)

    const httpResponse = {
      statusCode: 400,
      body: new InvalidParamError('passwordConfirmation')
    }

    expect(promise).toEqual(httpResponse)
  })

  it('should calls emailValidator with the correct params', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 400 if email provided is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const result = await sut.handle(httpRequest)

    const httpResponse = {
      statusCode: 400,
      body: new InvalidParamError('email')
    }

    expect(result).toEqual(httpResponse)
  })

  it('should return 500 if some external lib crashes', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const result = await sut.handle(httpRequest)

    const httpResponse = {
      statusCode: 500,
      body: new ServerError()
    }

    expect(result).toEqual(httpResponse)
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

  it('should return 200 when everything works', async () => {
    const { sut, addAccountStub } = makeSut()

    const mockAddResult = {
      id: faker.datatype.uuid(),
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    jest
      .spyOn(addAccountStub, 'add')
      .mockImplementationOnce(async () => mockAddResult)

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 200,
      body: mockAddResult
    })
  })
})
