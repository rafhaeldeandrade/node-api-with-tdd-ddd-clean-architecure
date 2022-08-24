import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'

describe('JwtAdapter', () => {
  it('should be defined', () => {
    expect(new JwtAdapter()).toBeDefined()
  })
})
