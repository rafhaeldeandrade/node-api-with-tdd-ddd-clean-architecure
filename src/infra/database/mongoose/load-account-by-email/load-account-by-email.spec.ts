import { MongooseLoadAccountByEmail } from '@/infra/database/mongoose/load-account-by-email/load-account-by-email'

describe('MongooseLoadAccountByEmailRepository', () => {
  it('should be defined', () => {
    const sut = new MongooseLoadAccountByEmail()
    expect(sut).toBeDefined()
  })
})
