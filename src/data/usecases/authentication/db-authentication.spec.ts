import { LoadAccountByEmailRepository } from '@/data/contracts/db/db-load-account-by-email-repository'
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
class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async load(email: string): Promise<AccountModel> {
    return fakeAccount
  }
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}
function makeSut(): SutTypes {
  const loadAccountByEmailRepositoryStub =
    new LoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
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
})
