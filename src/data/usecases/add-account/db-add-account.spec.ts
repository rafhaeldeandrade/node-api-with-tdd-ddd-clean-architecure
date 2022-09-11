import { AddAccountRepository } from '@/data/contracts/database/add-account-repository'
import { Hasher } from '@/data/contracts/authentication/hasher'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { AccountModel, Roles } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'
import { faker } from '@faker-js/faker'
import { LoadAccountByEmailRepository } from '@/data/contracts/database/load-account-by-email-repository'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import { UpdateAccessTokenRepository } from '@/data/contracts/database/update-access-token-repository'

const fakeId: string = faker.datatype.uuid()
const fakePassword = faker.internet.password()
const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword,
  role: 'reader'
}
const fakeEncryptedToken = faker.datatype.uuid()
function makeAccount(): AccountModel {
  return {
    id: fakeId,
    name: fakeData.name,
    email: fakeData.email,
    password: 'hash' + fakeData.password,
    accessToken: undefined,
    role: fakeData.role as Roles
  }
}

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async load(email: string): Promise<AccountModel | null> {
    return null
  }
}

class HasherStub implements Hasher {
  async hash(value: string): Promise<string> {
    return 'hash' + fakePassword
  }
}

class AddAccountRepositoryStub implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return makeAccount()
  }
}

class EncrypterStub implements Encrypter {
  encrypt(value: string): string {
    return fakeEncryptedToken
  }
}

class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async update(id: string, token: string): Promise<void> {
    return undefined
  }
}

interface SutTypes {
  sut: AddAccount
  hasher: Hasher
  loadAccountByEmailRepository: LoadAccountByEmailRepository
  addAccountRepository: AddAccountRepository
  encrypter: Encrypter
  updateAccessTokenRepository: UpdateAccessTokenRepository
}

function makeSut(): SutTypes {
  const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
  const hasher = new HasherStub()
  const addAccountRepository = new AddAccountRepositoryStub()
  const encrypter = new EncrypterStub()
  const updateAccessTokenRepository = new UpdateAccessTokenRepositoryStub()
  const sut = new DbAddAccount(
    loadAccountByEmailRepository,
    hasher,
    addAccountRepository,
    encrypter,
    updateAccessTokenRepository
  )
  return {
    sut,
    loadAccountByEmailRepository,
    hasher,
    addAccountRepository,
    encrypter,
    updateAccessTokenRepository
  }
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

  it('should call loadAccountByEmailRepository with the correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')

    await sut.add(fakeData)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(fakeData.email)
  })

  it('should return null if loadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    loadAccountByEmailRepository.load = jest
      .fn()
      .mockResolvedValueOnce(makeAccount())

    const result = await sut.add(fakeData)

    expect(result).toBeNull()
  })

  it('should throw an error if hasher throws', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    loadAccountByEmailRepository.load = jest
      .fn()
      .mockRejectedValueOnce(new Error())

    const promise = sut.add(fakeData)

    await expect(promise).rejects.toThrow()
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
      password: 'hash' + fakePassword,
      role: fakeData.role
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

  it('should call encrypter with correct param', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')

    await sut.add(fakeData)

    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith(fakeId)
  })

  it('should throw if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()
    encrypter.encrypt = jest.fn().mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add(fakeData)

    await expect(promise).rejects.toThrow()
  })

  it('should call updateAccessTokenRepository with correct params', async () => {
    const { sut, updateAccessTokenRepository } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepository, 'update')

    await sut.add(fakeData)

    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(fakeId, fakeEncryptedToken)
  })

  it('should throw if updateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepository } = makeSut()
    updateAccessTokenRepository.update = jest
      .fn()
      .mockImplementationOnce(() => {
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
      password: 'hash' + fakePassword,
      accessToken: fakeEncryptedToken,
      role: fakeData.role
    })
  })
})
