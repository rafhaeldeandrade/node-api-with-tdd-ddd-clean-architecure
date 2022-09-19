import { MongooseLoadAccountByToken } from '@/infra/database/mongoose/load-account-by-token'

describe('MongooseLoadAccountByToken', () => {
  it('should be defined', () => {
    expect(new MongooseLoadAccountByToken()).toBeDefined()
  })

  it('should have a method called load', () => {
    expect(new MongooseLoadAccountByToken().load).toBeDefined()
  })
})
