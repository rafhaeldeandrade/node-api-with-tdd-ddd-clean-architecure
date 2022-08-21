import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'

describe('DbAuthentication', () => {
  it('should be defined', () => {
    expect(new DbAuthentication()).toBeDefined()
  })
})
