import { Argon2Adapter } from '@/infra/cryptography/argon2-adapter'

describe('Argon2Adapter', () => {
  it('should be defined', () => {
    expect(new Argon2Adapter()).toBeDefined()
  })
})
