import { Encrypter } from '@/data/contracts/encrypter'

export class Argon2Adapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return ''
  }
}
