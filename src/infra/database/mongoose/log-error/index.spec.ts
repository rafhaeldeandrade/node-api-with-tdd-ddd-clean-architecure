import { MongooseLogError } from '@/infra/database/mongoose/log-error'

describe('MongooseLogError', () => {
  it('should be defined', () => {
    expect(new MongooseLogError()).toBeDefined()
  })
})
