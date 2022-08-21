import { Encrypter } from '@/data/contracts/authentication/encrypter'
import argon2 from 'argon2'

export class Argon2Adapter implements Encrypter {
  constructor(
    private readonly argon2Options?: argon2.Options & { raw?: false }
  ) {}

  async encrypt(value: string): Promise<string> {
    const hash = await argon2.hash(value, this.argon2Options)

    return hash
  }
}
