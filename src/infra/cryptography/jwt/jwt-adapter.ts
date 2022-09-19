import { Decrypter } from '@/data/contracts/authentication/decrypter'
import { Encrypter } from '@/data/contracts/authentication/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly jwtSecret: string) {}

  encrypt(value: string): string {
    return jwt.sign(value, this.jwtSecret)
  }

  decrypt(value: string): any | null {
    try {
      jwt.verify(value, this.jwtSecret)
    } catch (error) {
      return null
    }
  }
}
