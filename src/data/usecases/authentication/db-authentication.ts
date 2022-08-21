import { LoadAccountByEmailRepository } from '@/data/contracts/db/db-load-account-by-email-repository'
import {
  Authentication,
  AuthenticationModel
} from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(params: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(params.email)
    return null
  }
}
