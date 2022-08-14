import { RequiredFieldValidation } from '@/presentation/helpers/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validation-composite'

export function makeSignupValidationComposite(): ValidationComposite {
  const validations = []
  const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
  for (const param of requiredParams) {
    validations.push(new RequiredFieldValidation(param))
  }
  return new ValidationComposite(validations)
}
