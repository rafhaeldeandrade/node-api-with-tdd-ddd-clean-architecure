import { AddAccountRepository } from '@/data/contracts/database/add-account-repository'
import { Hasher } from '@/data/contracts/authentication/hasher'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '@/data/contracts/database/load-account-by-email-repository'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import { UpdateAccessTokenRepository } from '@/data/contracts/database/update-access-token-repository'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
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
    const accessToken = this.encrypter.encrypt(createdAccount.id)
    await this.updateAccessTokenRepository.update(
      createdAccount.id,
      accessToken
    )
    return createdAccount
  }
}
