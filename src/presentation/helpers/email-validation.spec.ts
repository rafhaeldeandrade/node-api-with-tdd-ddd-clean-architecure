import { EmailValidation } from '@/presentation/helpers/email-validation'

interface SutTypes {
  sut: EmailValidation
}

function makeSut(): SutTypes {
  const sut = new EmailValidation()
  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
