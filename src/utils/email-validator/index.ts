import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidatorAdapter {
  isValid(email: string): boolean {
    const emailValidator = validator.isEmail(email)

    return emailValidator
  }
}
