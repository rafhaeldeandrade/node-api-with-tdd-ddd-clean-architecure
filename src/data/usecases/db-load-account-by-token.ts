import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { LoadAccountByTokenRepository } from '../contracts/database/load-account-by-token'

export class DbLoadAccountByTokenUseCase implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(token: string): Promise<AccountModel | null> {
    await this.loadAccountByTokenRepository.load(token)
    return null
  }
}
