import { LoadAccountByTokenRepository } from '@/data/contracts/database/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

export class MongooseLoadAccountByToken
  implements LoadAccountByTokenRepository
{
  async load(token: string): Promise<AccountModel | null> {
    const account = await mongooseAccountModel.findOne(
      { accessToken: token },
      {},
      { lean: true }
    )
    if (!account) return null
    return {
      id: account._id.toString(),
      name: account.name,
      email: account.email,
      password: account.password,
      role: account.role,
      accessToken: account.accessToken
    }
  }
}
