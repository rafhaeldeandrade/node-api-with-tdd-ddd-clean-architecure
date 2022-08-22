import { MongooseLoadAccountByEmail } from '@/infra/database/mongoose/load-account-by-email/load-account-by-email'

interface SutTypes {
  sut: MongooseLoadAccountByEmail
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseLoadAccountByEmail()
  }
}

describe('MongooseLoadAccountByEmailRepository', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called load', () => {
    const { sut } = makeSut()
    expect(sut.load).toBeDefined()
  })
})
