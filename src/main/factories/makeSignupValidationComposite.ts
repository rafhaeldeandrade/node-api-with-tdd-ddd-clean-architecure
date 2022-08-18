import { CompareFieldValidation } from '@/presentation/helpers/validators/compare-field-validdation'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '@/utils/email-validator'

export function makeSignupValidationComposite(): ValidationComposite {
  const validations = []
  const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
  for (const param of requiredParams) {
    validations.push(new RequiredFieldValidation(param))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  const emailValidator = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
