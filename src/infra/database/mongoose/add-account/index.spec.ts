import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'

describe('MongooseAddAccount', () => {
  it('should be defined', () => {
    expect(new MongooseAddAccount()).toBeDefined()
  })
})
