import { EmailValidatorAdapter } from '@/utils/email-validator'

describe('EmailValidator', () => {
  it('should be defined', () => {
    expect(new EmailValidatorAdapter()).toBeDefined()
  })
})
