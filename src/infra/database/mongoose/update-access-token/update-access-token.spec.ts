import { MongooseUpdateAccessToken } from '@/infra/database/mongoose/update-access-token/update-access-token'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'
import { faker } from '@faker-js/faker'

const fakeParams = {
  accountId: faker.datatype.uuid(),
  accessToken: faker.datatype.string(80)
}
describe('MongooseUpdateAccessTokenRepository', () => {
  it('should be defined', () => {
    expect(new MongooseUpdateAccessToken()).toBeDefined()
  })

  it('should have a method called update', () => {
    expect(new MongooseUpdateAccessToken().update).toBeDefined()
  })

  it('should call mongooseAccountModel.updateOne with correct params', async () => {
    const sut = new MongooseUpdateAccessToken()
    const updateOneSpy = jest
      .spyOn(mongooseAccountModel, 'updateOne')
      .mockResolvedValueOnce(null as any)
    const { accountId, accessToken } = fakeParams
    await sut.update(accountId, accessToken)
    expect(updateOneSpy).toHaveBeenCalledTimes(1)
    expect(updateOneSpy).toHaveBeenCalledWith(
      { _id: accountId },
      { $set: { accessToken } }
    )
  })
})
