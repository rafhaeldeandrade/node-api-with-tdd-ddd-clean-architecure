import { AddAccountRepository } from '@/data/contracts/db/add-account-repository'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}
