import { AddAccountRepository } from '@/data/contracts/database/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

export class MongooseAddAccount implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await mongooseAccountModel.create(accountData)

    const { _id, name, email, password } = account
    return { name, email, password, id: _id.toString() }
  }
}
