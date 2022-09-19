import { DbLoadAccountByTokenUseCase } from '@/data/usecases/db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByTokenUseCase
}

function makeSut(): SutTypes {
  const sut = new DbLoadAccountByTokenUseCase()

  return { sut }
}

describe('LoadAccountByToken Usecase', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
