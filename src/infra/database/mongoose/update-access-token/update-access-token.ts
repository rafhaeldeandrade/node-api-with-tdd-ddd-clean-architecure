import { UpdateAccessTokenRepository } from '@/data/contracts/database/update-access-token-repository'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

export class MongooseUpdateAccessToken implements UpdateAccessTokenRepository {
  async update(accountId: string, accessToken: string): Promise<void> {
    await mongooseAccountModel.updateOne(
      { _id: accountId },
      { $set: { accessToken } }
    )
  }
}
