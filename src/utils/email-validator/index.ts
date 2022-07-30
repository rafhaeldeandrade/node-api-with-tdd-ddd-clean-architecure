import { EmailValidator } from '@/presentation/contracts/email-validator'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    const emailValidator = validator.isEmail(email)

    return emailValidator
  }
}
