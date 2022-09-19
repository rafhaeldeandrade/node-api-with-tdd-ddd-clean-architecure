import { faker } from '@faker-js/faker'
import { DbLoadAccountByTokenUseCase } from '@/data/usecases/db-load-account-by-token'
import { LoadAccountByTokenRepository } from '@/data/contracts/database/load-account-by-token'
import { AccountModel, Roles } from '@/domain/models/account'
import { Decrypter } from '@/data/contracts/authentication/decrypter'

const fakeAccount = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.helpers.arrayElement([
    'admin',
    'moderator',
    'writer',
    'reader'
  ]) as Roles
}

const fakePayload = {
  id: faker.datatype.uuid()
}
class DecrypterStub implements Decrypter {
  decrypt(token: string): any | null {
    return fakePayload
  }
}

class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  async load(token: string): Promise<AccountModel | null> {
    return fakeAccount
  }
}

interface SutTypes {
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  sut: DbLoadAccountByTokenUseCase
}

function makeSut(): SutTypes {
  const decrypterStub = new DecrypterStub()
  const loadAccountByTokenRepositoryStub =
    new LoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByTokenUseCase(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  )

  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('LoadAccountByToken Usecase', () => {
  const fakeAccessToken = faker.datatype.uuid()
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called load', () => {
    const { sut } = makeSut()

    expect(sut.load).toBeDefined()
  })

  it('should call decrypter with correct param', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load(fakeAccessToken)

    expect(decryptSpy).toHaveBeenCalledTimes(1)
    expect(decryptSpy).toHaveBeenCalledWith(fakeAccessToken)
  })

  it('should return null if decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    decrypterStub.decrypt = jest.fn().mockReturnValueOnce(null)

    const promise = sut.load(fakeAccessToken)

    await expect(promise).resolves.toBeNull()
  })

  it('should call loadAccountByTokenRepository with correct param if decrypter returns payload', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'load')

    await sut.load(fakeAccessToken)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(fakeAccessToken)
  })
})
