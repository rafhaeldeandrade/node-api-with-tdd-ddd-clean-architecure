import { AddAccountRepository } from '@/data/contracts/db/add-account-repository'
import { Hasher } from '@/data/contracts/authentication/hasher'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'
import { faker } from '@faker-js/faker'

const fakeId: string = faker.datatype.uuid()
const fakePassword = faker.internet.password()
const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword
}
class HasherStub implements Hasher {
  async hash(value: string): Promise<string> {
    return 'hash' + fakePassword
  }
}

class AddAccountRepositoryStub implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return {
      id: fakeId,
      name: fakeData.name,
      email: fakeData.email,
      password: 'hash' + fakeData.password
    }
  }
}

interface SutTypes {
  sut: AddAccount
  hasher: Hasher
  addAccountRepository: AddAccountRepository
}

function makeSut(): SutTypes {
  const hasher = new HasherStub()
  const addAccountRepository = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(hasher, addAccountRepository)
  return { sut, hasher, addAccountRepository }
}

describe('DbAddAccountUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a add method', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })

  it('should call hasher with the correct password', async () => {
    const { sut, hasher } = makeSut()

    const encryptSpy = jest.spyOn(hasher, 'hash')
    await sut.add(fakeData)

    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith(fakePassword)
  })

  it('should throw an error if hasher throws', async () => {
    const { sut, hasher } = makeSut()

    jest.spyOn(hasher, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })
    const promise = sut.add(fakeData)

    await expect(promise).rejects.toThrow()
  })

  it('should call addAccountRepository with the correct params', async () => {
    const { sut, addAccountRepository } = makeSut()

    const addSpy = jest.spyOn(addAccountRepository, 'add')
    await sut.add(fakeData)

    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      name: fakeData.name,
      email: fakeData.email,
      password: 'hash' + fakePassword
    })
  })

  it('should throw an error if addAccountRepository throws', async () => {
    const { sut, addAccountRepository } = makeSut()

    jest.spyOn(addAccountRepository, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })
    const promise = sut.add(fakeData)

    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(fakeData)

    expect(account).toEqual({
      id: fakeId,
      name: fakeData.name,
      email: fakeData.email,
      password: 'hash' + fakePassword
    })
  })
})
