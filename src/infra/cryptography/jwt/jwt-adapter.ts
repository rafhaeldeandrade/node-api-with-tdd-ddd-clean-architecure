import { Encrypter } from '@/data/contracts/authentication/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly jwtSecret: string) {}
  async encrypt(value: string): Promise<string> {
    return jwt.sign(value, this.jwtSecret)
  }
}
