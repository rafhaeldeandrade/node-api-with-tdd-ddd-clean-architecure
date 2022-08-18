import { Validation } from '@/presentation/contracts/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class CompareFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any): Error | null {
    if (input[this.fieldName] === input[this.fieldToCompareName]) return null

    return new InvalidParamError(this.fieldToCompareName)
  }
}
