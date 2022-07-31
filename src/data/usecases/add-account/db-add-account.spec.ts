import { AddAccountRepository } from '@/data/contracts/add-account-repository'
import { Encrypter } from '@/data/contracts/encrypter'
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
class EncrypterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return await new Promise((resolve) => resolve('hash' + fakePassword))
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
  encrypter: Encrypter
  addAccountRepository: AddAccountRepository
}

function makeSut(): SutTypes {
  const encrypter = new EncrypterStub()
  const addAccountRepository = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypter, addAccountRepository)
  return { sut, encrypter, addAccountRepository }
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

  it('should call encrypter with the correct password', async () => {
    const { sut, encrypter } = makeSut()

    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.add(fakeData)

    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith(fakePassword)
  })

  it('should throw an error if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()

    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(async () => {
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
})
