import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/presentation/helpers/required-field-validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

const fakeFieldName = faker.random.word()

describe('RequiredFieldValidation', () => {
  it('should be defined', () => {
    const sut = new RequiredFieldValidation(fakeFieldName)

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const sut = new RequiredFieldValidation(fakeFieldName)

    expect(sut.validate).toBeDefined()
  })

  it('should return MissingParamError if fieldName isnt in input', () => {
    const sut = new RequiredFieldValidation(fakeFieldName)

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError(fakeFieldName))
  })
})
