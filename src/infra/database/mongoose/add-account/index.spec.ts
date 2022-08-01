import { AddAccountRepository } from '@/data/contracts/add-account-repository'
import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'

interface SutTypes {
  sut: AddAccountRepository
}

function makeSut(): SutTypes {
  const sut = new MongooseAddAccount()
  return {
    sut
  }
}

describe('MongooseAddAccount', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called add', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })
})
