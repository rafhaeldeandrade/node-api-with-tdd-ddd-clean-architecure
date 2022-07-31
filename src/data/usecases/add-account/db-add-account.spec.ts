import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/add-account'

interface SutTypes {
  sut: AddAccount
}

function makeSut(): SutTypes {
  const sut = new DbAddAccount()
  return { sut }
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
})
