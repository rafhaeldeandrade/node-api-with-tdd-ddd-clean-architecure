import { AddAccountRepository } from '@/data/contracts/add-account-repository'
import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: AddAccountRepository
}

function makeSut(): SutTypes {
  const sut = new MongooseAddAccount()
  return {
    sut
  }
}

describe('MongooseAddAccount', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called add', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })

  it("should call mongoModel's create method with the correct params", async () => {
    const { sut } = makeSut()

    const fakeId = faker.datatype.uuid()
    const fakeAccount = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const createSpy = (mongooseAccountModel.create = jest
      .fn()
      .mockResolvedValueOnce({ _id: fakeId, ...fakeAccount }))

    await sut.add(fakeAccount)

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(fakeAccount)
  })
})
