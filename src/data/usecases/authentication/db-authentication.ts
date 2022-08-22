import { HashComparer } from '@/data/contracts/authentication/hash-comparer'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import { LoadAccountByEmailRepository } from '@/data/contracts/database/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/contracts/database/update-access-token-repository'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(params: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (!account) return null
    const hashIsValid = await this.hashComparer.compare(
      params.password,
      account.password
    )
    if (!hashIsValid) return null
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
