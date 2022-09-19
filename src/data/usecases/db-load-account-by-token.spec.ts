import { faker } from '@faker-js/faker'
import { DbLoadAccountByTokenUseCase } from '@/data/usecases/db-load-account-by-token'
import { LoadAccountByTokenRepository } from '@/data/contracts/database/load-account-by-token'
import { AccountModel, Roles } from '@/domain/models/account'

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

class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  async load(token: string): Promise<AccountModel | null> {
    return fakeAccount
  }
}

interface SutTypes {
  sut: DbLoadAccountByTokenUseCase
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

function makeSut(): SutTypes {
  const loadAccountByTokenRepositoryStub =
    new LoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByTokenUseCase(loadAccountByTokenRepositoryStub)

  return { sut, loadAccountByTokenRepositoryStub }
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

  it('should call loadAccountByTokenRepository with correct param', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'load')

    await sut.load(fakeAccessToken)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(fakeAccessToken)
  })
})
