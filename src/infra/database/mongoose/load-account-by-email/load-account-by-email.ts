import { LoadAccountByEmailRepository } from '@/data/contracts/db/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongooseLoadAccountByEmail
  implements LoadAccountByEmailRepository
{
  async load(email: string): Promise<AccountModel | null> {
    const account = await mongooseAccountModel.findOne({ email }, null, {
      lean: true
    })
    if (!account) return null
    return {
      id: account._id.toString(),
      name: account.name,
      email: account.email,
      password: account.password
    }
  }
}
