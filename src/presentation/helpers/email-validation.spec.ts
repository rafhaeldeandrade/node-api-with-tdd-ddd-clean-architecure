import { EmailValidation } from '@/presentation/helpers/email-validation'
import { EmailValidator } from '@/presentation/contracts/email-validator'
import { faker } from '@faker-js/faker'

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true
  }
}

interface SutTypes {
  sut: EmailValidation
  emailValidator: EmailValidator
}

function makeSut(fieldName: string): SutTypes {
  const emailValidator = new EmailValidatorStub()
  const sut = new EmailValidation(fieldName, emailValidator)
  return {
    sut,
    emailValidator
  }
}
const fakeFieldName = faker.random.word()
const fakeEmail = faker.internet.email()

describe('EmailValidation', () => {
  it('should be defined', () => {
    const { sut } = makeSut(fakeFieldName)

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const { sut } = makeSut(fakeFieldName)

    expect(sut.validate).toBeDefined()
  })

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidator } = makeSut(fakeFieldName)
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')

    sut.validate({ [fakeFieldName]: fakeEmail })

    expect(isValidSpy).toHaveBeenCalledTimes(1)
    expect(isValidSpy).toHaveBeenCalledWith(fakeEmail)
  })
})
