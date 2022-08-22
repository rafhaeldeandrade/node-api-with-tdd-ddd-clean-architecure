import { LogErrorRepository } from '@/data/contracts/database/log-error-repository'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'
import { mongooseLogModel } from '@/infra/database/mongoose/schemas/log'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: LogErrorRepository
}

function makeSut(): SutTypes {
  const sut = new MongooseLogError()
  return {
    sut
  }
}

describe('MongooseLogError', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called logError', () => {
    const { sut } = makeSut()
    expect(sut.logError).toBeDefined()
  })

  it('should call logModel.create with the correct param', async () => {
    const { sut } = makeSut()
    mongooseLogModel.create = jest.fn()

    const fakeStack = faker.lorem.sentence(10)
    await sut.logError(fakeStack)

    expect(mongooseLogModel.create).toHaveBeenCalledTimes(1)
    expect(mongooseLogModel.create).toHaveBeenCalledWith({ stack: fakeStack })
  })
})
