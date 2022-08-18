import { Validation } from '@/presentation/contracts/validation'
import { EmailValidator } from '@/presentation/contracts/email-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  }
}
