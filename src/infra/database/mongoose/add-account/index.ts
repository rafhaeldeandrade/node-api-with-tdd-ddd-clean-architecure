import { AddAccountRepository } from '@/data/contracts/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

export class MongooseAddAccount implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await mongooseAccountModel.create(accountData)

    const { _id, ...accountWithoutUnderscoredId } = account
    return { ...accountWithoutUnderscoredId, id: _id.toString() }
  }
}
