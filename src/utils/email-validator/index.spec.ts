import { EmailValidatorAdapter } from '@/utils/email-validator'

describe('EmailValidator', () => {
  it('should be defined', () => {
    expect(new EmailValidatorAdapter()).toBeDefined()
  })

  it('should have an isValid method', () => {
    expect(new EmailValidatorAdapter().isValid).toBeDefined()
  })
})
