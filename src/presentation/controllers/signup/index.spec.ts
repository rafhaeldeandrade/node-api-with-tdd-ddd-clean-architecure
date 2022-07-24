import { SignupController } from '@/presentation/controllers/signup'

describe('SignupController', () => {
  it('should be defined', () => {
    const sut = new SignupController()

    expect(sut).toBeDefined()
  })
})
