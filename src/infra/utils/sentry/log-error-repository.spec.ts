import * as Sentry from '@sentry/node'
import { LogErrorRepository } from '@/data/contracts/database/log-error-repository'
import { faker } from '@faker-js/faker'
import { SentryLogError } from '@/infra/utils/sentry/log-error-repository'

interface SutTypes {
  sut: LogErrorRepository
}

function makeSut(): SutTypes {
  const sut = new SentryLogError()
  return {
    sut
  }
}

describe('SentryLogError', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called logError', () => {
    const { sut } = makeSut()
    expect(sut.logError).toBeDefined()
  })

  it('should call Sentry.captureException with the correct param', async () => {
    const { sut } = makeSut()
    const captureExceptionSpy = jest.spyOn(Sentry, 'captureException')

    const fakeStack = faker.lorem.sentence(10)
    await sut.logError(fakeStack)

    expect(captureExceptionSpy).toHaveBeenCalledTimes(1)
    expect(captureExceptionSpy).toHaveBeenCalledWith(fakeStack)
  })
})
