import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class RequiredFieldValidation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
