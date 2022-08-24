import { Encrypter } from '@/data/contracts/authentication/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly jwtSecret: string) {}
  encrypt(value: string): string {
    return jwt.sign(value, this.jwtSecret)
  }
}
