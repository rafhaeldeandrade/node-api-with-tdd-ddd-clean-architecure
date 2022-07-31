import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return await new Promise((resolve) =>
      resolve(null as unknown as AccountModel)
    )
  }
}
