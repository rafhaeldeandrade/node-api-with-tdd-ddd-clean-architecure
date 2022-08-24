import { MongooseUpdateAccessToken } from '@/infra/database/mongoose/update-access-token/update-access-token'

describe('MongooseUpdateAccessTokenRepository', () => {
  it('should be defined', () => {
    expect(new MongooseUpdateAccessToken()).toBeDefined()
  })

  it('should have a method called update', () => {
    expect(new MongooseUpdateAccessToken().update).toBeDefined()
  })
})
