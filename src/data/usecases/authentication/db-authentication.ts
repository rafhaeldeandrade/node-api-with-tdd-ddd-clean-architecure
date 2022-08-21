import { HashComparer } from '@/data/contracts/authentication/hash-comparer'
import { TokenGenerator } from '@/data/contracts/authentication/token-generator'
import { LoadAccountByEmailRepository } from '@/data/contracts/db/db-load-account-by-email-repository'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth(params: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (!account) return null
    const hashIsValid = await this.hashComparer.compare(
      params.password,
      account.password
    )
    if (!hashIsValid) return null
    return await this.tokenGenerator.generate(account.id)
  }
}
