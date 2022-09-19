import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

export class MongooseLoadAccountByToken {
  async load(token: string): Promise<null> {
    await mongooseAccountModel.findOne(
      { accessToken: token },
      {},
      { lean: true }
    )
    return null
  }
}
