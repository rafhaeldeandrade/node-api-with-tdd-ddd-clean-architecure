import { HashComparer } from '@/data/contracts/authentication/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/contracts/db/db-load-account-by-email-repository'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(params: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      await this.hashComparer.compare(params.password, account.password)
    }
    return null
  }
}
