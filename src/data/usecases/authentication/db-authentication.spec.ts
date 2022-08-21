import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'

interface SutTypes {
  sut: DbAuthentication
}
function makeSut(): SutTypes {
  return {
    sut: new DbAuthentication()
  }
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
})
