import { LogErrorRepository } from '@/data/contracts/log-error-repository'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { faker } from '@faker-js/faker'

const fakePassword = faker.internet.password()
function makeHttpRequest(): httpRequest {
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: fakePassword,
      passwordConfirmation: fakePassword
    }
  }
}

const fakeHttpResponse = {
  statusCode: 200,
  body: {
    name: faker.name.findName()
  }
}

class LogErrorRepositoryStub implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    return await new Promise((resolve) => resolve())
  }
}

class ControllerStub implements Controller {
  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    return fakeHttpResponse
  }
}

interface SutTypes {
  sut: Controller
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

function makeSut(): SutTypes {
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const controllerStub = new ControllerStub()
  const sut = new LogErrorDecoratorController(
    controllerStub,
    logErrorRepositoryStub
  )
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogErrorDecoratorController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called handle', () => {
    const { sut } = makeSut()

    expect(sut.handle).toBeDefined()
  })

  it("should call a Controllers' handle method with the correct params", async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return a httpResponse on success', async () => {
    const { sut } = makeSut()

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(fakeHttpResponse)
  })

  it('should call LogErrorRepository with correct error if controller returns serverError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const error = new Error()
    error.stack = 'any_stack'
    const httpRequest = makeHttpRequest()
    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(serverError(error))
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(httpRequest)

    expect(logErrorSpy).toHaveBeenCalledWith(error.stack)
  })
})
