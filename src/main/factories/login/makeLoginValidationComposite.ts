import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '@/utils/email-validator'

export function makeLoginValidationComposite(): ValidationComposite {
  const validations = []
  const requiredParams = ['email', 'password']
  for (const param of requiredParams) {
    validations.push(new RequiredFieldValidation(param))
  }
  const emailValidator = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
