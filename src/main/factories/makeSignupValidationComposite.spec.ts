import { CompareFieldValidation } from '@/presentation/helpers/compare-field-validdation'
import { RequiredFieldValidation } from '@/presentation/helpers/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validation-composite'
import { makeSignupValidationComposite } from './makeSignupValidationComposite'
jest.mock('@/presentation/helpers/validation-composite', () => {
  return {
    ValidationComposite: jest.fn().mockImplementation(() => {
      return {
        validate: jest.fn().mockReturnValue(null)
      }
    })
  }
})

describe('SignupValidationComposite', () => {
  it('should call ValidationComposite with the correct params', () => {
    makeSignupValidationComposite()
    const validations = []
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
    for (const param of requiredParams) {
      validations.push(new RequiredFieldValidation(param))
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    )

    const validationComposite = ValidationComposite as jest.Mock

    expect(validationComposite.mock.calls.length).toBe(1)
    expect(validationComposite.mock.calls[0][0]).toEqual(validations)
  })
})
