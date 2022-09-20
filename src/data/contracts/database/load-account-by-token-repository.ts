import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByTokenRepository {
  load: (token: string) => Promise<AccountModel | null>
}
