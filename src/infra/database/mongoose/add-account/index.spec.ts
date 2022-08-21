import { AddAccountRepository } from '@/data/contracts/db/add-account-repository'
import { AddAccountModel } from '@/domain/usecases/add-account'
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

function makeFakeAccount(): AddAccountModel {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
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
    const fakeAccount = makeFakeAccount()

    const createSpy = (mongooseAccountModel.create = jest
      .fn()
      .mockResolvedValueOnce({ _id: fakeId, ...fakeAccount }))

    await sut.add(fakeAccount)

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(fakeAccount)
  })

  it('should return an AccountModel on success', async () => {
    const { sut } = makeSut()

    const fakeId = faker.datatype.uuid()
    const fakeAccount = makeFakeAccount()

    mongooseAccountModel.create = jest
      .fn()
      .mockResolvedValueOnce({ _id: fakeId, ...fakeAccount })

    const account = await sut.add(fakeAccount)

    expect(account).toEqual({
      id: fakeId,
      ...fakeAccount
    })
  })

  it('should throw if create throws', async () => {
    const { sut } = makeSut()

    const fakeAccount = makeFakeAccount()

    mongooseAccountModel.create = jest.fn().mockImplementationOnce(async () => {
      throw new Error()
    })

    const promise = sut.add(fakeAccount)

    await expect(promise).rejects.toThrow()
  })
})
