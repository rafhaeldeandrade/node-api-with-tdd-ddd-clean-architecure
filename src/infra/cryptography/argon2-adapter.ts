import { Hasher } from '@/data/contracts/authentication/hasher'
import argon2 from 'argon2'

export class Argon2Adapter implements Hasher {
  constructor(
    private readonly argon2Options?: argon2.Options & { raw?: false }
  ) {}

  async hash(value: string): Promise<string> {
    const hash = await argon2.hash(value, this.argon2Options)

    return hash
  }
}
