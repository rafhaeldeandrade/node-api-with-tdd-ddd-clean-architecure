import { LoginController } from '@/presentation/controllers/login'

describe('LoginController', () => {
  it('should be defined', () => {
    expect(new LoginController()).toBeDefined()
  })

  it('should have a method called handle', () => {
    expect(new LoginController().handle).toBeDefined()
  })
})
