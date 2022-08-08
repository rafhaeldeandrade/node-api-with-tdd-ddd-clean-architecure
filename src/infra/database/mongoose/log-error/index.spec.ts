import { MongooseLogError } from '@/infra/database/mongoose/log-error'

describe('MongooseLogError', () => {
  it('should be defined', () => {
    expect(new MongooseLogError()).toBeDefined()
  })

  it('should have a method called logError', () => {
    expect(new MongooseLogError().logError).toBeDefined()
  })
})
