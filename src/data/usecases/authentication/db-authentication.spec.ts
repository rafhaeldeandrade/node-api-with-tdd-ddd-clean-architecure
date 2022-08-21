import { HashComparer } from '@/data/contracts/authentication/hash-comparer'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import { LoadAccountByEmailRepository } from '@/data/contracts/db/db-load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/contracts/db/update-access-token-repository'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { AccountModel } from '@/domain/models/account'
import { faker } from '@faker-js/faker'

const fakePassword = faker.internet.password()
const fakeAccount = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword
}

class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async update(accountId: string, token: string): Promise<void> {
    return await Promise.resolve()
  }
}

const fakeAccessToken = faker.datatype.uuid()
class EncrypterStub implements Encrypter {
  async encrypt(accountId: string): Promise<string> {
    return fakeAccessToken
  }
}

class HashComparerStub implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return true
  }
}

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async load(email: string): Promise<AccountModel> {
    return fakeAccount
  }
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}
function makeSut(): SutTypes {
  const updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub()
  const encrypterStub = new EncrypterStub()
  const hashComparerStub = new HashComparerStub()
  const loadAccountByEmailRepositoryStub =
    new LoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

const fakeParams = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('DbAuthentication', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called auth', async () => {
    const { sut } = makeSut()

    expect(sut.auth).toBeDefined()
  })

  it('should call loadAccountByEmailRepository with the correct param', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth(fakeParams)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(fakeParams.email)
  })

  it('should should throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error())

    const promise = sut.auth(fakeParams)

    await expect(promise).rejects.toThrow()
  })

  it('should return null if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockResolvedValueOnce(null as any)

    const accessToken = await sut.auth(fakeParams)

    expect(accessToken).toBeNull()
  })

  it('should call hashComparer if loadAccountByEmailRepository with the correct params if returns an account', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    await sut.auth(fakeParams)

    expect(compareSpy).toHaveBeenCalledWith(
      fakeParams.password,
      fakeAccount.password
    )
  })

  it('should throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())

    const promise = sut.auth(fakeParams)

    await expect(promise).rejects.toThrow()
  })

  it('should return null if hashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false as any)

    const accessToken = await sut.auth(fakeParams)

    expect(accessToken).toBeNull()
  })

  it('should call encrypter with the correct param if loadAccountByEmailRepository returns an account', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth(fakeParams)

    expect(generateSpy).toBeCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledWith(fakeAccount.id)
  })

  it('should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())

    const promise = sut.auth(fakeParams)

    await expect(promise).rejects.toThrow()
  })

  it('should call updateAccessTokenRepository with the correct params if loadAccountByEmailRepository returns an account', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')

    await sut.auth(fakeParams)

    expect(updateSpy).toBeCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(fakeAccount.id, fakeAccessToken)
  })

  it('should throw if updateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())

    const promise = sut.auth(fakeParams)

    await expect(promise).rejects.toThrow()
  })

  it('should return a token on success', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth(fakeParams)

    expect(accessToken).toBe(fakeAccessToken)
  })
})
