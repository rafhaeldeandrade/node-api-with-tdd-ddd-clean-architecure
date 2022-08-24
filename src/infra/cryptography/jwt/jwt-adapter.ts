import { Encrypter } from '@/data/contracts/authentication/encrypter'

export class JwtAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return null as unknown as string
  }
}
