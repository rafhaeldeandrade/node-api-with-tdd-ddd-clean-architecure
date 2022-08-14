import { Validation } from '@/presentation/helpers/validation'

export class ValidationComposite {
  constructor(private readonly validators: Validation[]) {}
  validate(input: any): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
