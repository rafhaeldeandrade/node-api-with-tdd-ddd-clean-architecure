import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

describe('DbAddAccountUseCase', () => {
  it('should be defined', () => {
    const sut = new DbAddAccount()

    expect(sut).toBeDefined()
  })
})
