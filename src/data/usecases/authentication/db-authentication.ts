import { Authentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  async auth(): Promise<string> {
    return ''
  }
}
