import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { Decrypter } from '@/data/contracts/authentication/decrypter'
import { LoadAccountByTokenRepository } from '@/data/contracts/database/load-account-by-token'

export class DbLoadAccountByTokenUseCase implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(token: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(token)
    await this.loadAccountByTokenRepository.load(token)
    return null
  }
}
