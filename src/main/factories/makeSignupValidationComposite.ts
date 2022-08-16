import { CompareFieldValidation } from '@/presentation/helpers/compare-field-validdation'
import { RequiredFieldValidation } from '@/presentation/helpers/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validation-composite'

export function makeSignupValidationComposite(): ValidationComposite {
  const validations = []
  const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
  for (const param of requiredParams) {
    validations.push(new RequiredFieldValidation(param))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
