import { Validation } from '@/presentation/helpers/validation'

export class EmailValidation implements Validation {
  validate(input: any): Error | null {
    return null
  }
}
