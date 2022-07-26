import { EmailValidator } from '@/presentation/contracts/email-validator'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import { faker } from '@faker-js/faker'
import validator from 'validator'

function makeSut(): { sut: EmailValidator } {
  const sut = new EmailValidatorAdapter()

  return { sut }
}

describe('EmailValidator', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have an isValid method', () => {
    const { sut } = makeSut()

    expect(sut.isValid).toBeDefined()
  })

  it('should call validator lib with the correct email', () => {
    const { sut } = makeSut()
    const isValidSpy = jest.spyOn(validator, 'isEmail')

    const fakeEmail = faker.internet.email()
    sut.isValid(fakeEmail)

    expect(isValidSpy).toHaveBeenCalledWith(fakeEmail)
  })

  it('should return false if validator returns false', () => {
    const { sut } = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.email())

    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const { sut } = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid(faker.internet.email())

    expect(isValid).toBe(true)
  })
})
