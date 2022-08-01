import { AddAccountRepository } from '@/data/contracts/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'

export class MongooseAddAccount implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return null as unknown as AccountModel
  }
}
