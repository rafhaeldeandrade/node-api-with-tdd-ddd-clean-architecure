import { CompareFieldValidation } from '@/presentation/helpers/validators/compare-field-validdation'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import { makeSignupValidationComposite } from '@/main/factories/signup/makeSignupValidationComposite'
jest.mock('@/presentation/helpers/validators/validation-composite', () => {
  return {
    ValidationComposite: jest.fn().mockImplementation(() => {
      return {
        validate: jest.fn().mockReturnValue(null)
      }
    })
  }
})

describe('SignupValidationComposite', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
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
    const emailValidator = new EmailValidatorAdapter()
    validations.push(new EmailValidation('email', emailValidator))
    const validationComposite = ValidationComposite as jest.Mock

    expect(validationComposite.mock.calls.length).toBe(1)
    expect(validationComposite.mock.calls[0][0]).toEqual(validations)
  })
})
