import { MongooseUpdateAccessToken } from '@/infra/database/mongoose/update-access-token/update-access-token'

describe('MongooseUpdateAccessTokenRepository', () => {
  it('should be defined', () => {
    expect(new MongooseUpdateAccessToken()).toBeDefined()
  })
})
