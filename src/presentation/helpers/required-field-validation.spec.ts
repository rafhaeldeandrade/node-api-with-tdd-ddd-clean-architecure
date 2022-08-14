import { RequiredFieldValidation } from '@/presentation/helpers/required-field-validation'

describe('RequiredFieldValidation', () => {
  it('should be defined', () => {
    const sut = new RequiredFieldValidation()

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const sut = new RequiredFieldValidation()

    expect(sut.validate).toBeDefined()
  })
})
