import { AddAccountRepository } from '@/data/contracts/database/add-account-repository'
import { Hasher } from '@/data/contracts/authentication/hasher'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '@/data/contracts/database/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepository.load(
      accountData.email
    )
    if (account) return null
    const hashedPassword = await this.hasher.hash(accountData.password)
    const createdAccount = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return createdAccount
  }
}
