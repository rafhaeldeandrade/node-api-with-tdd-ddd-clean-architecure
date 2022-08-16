import { Validation } from '@/presentation/helpers/validation'
import { EmailValidator } from '@/presentation/contracts/email-validator'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): Error | null {
    this.emailValidator.isValid(input[this.fieldName])
    return null
  }
}
