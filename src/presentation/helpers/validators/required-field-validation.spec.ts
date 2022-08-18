import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

const fakeFieldName = faker.random.word()

interface SutTypes {
  sut: RequiredFieldValidation
}

function makeSut(field: string): SutTypes {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('should be defined', () => {
    const { sut } = makeSut(fakeFieldName)

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const { sut } = makeSut(fakeFieldName)

    expect(sut.validate).toBeDefined()
  })

  it('should return MissingParamError if fieldName isnt in input', () => {
    const { sut } = makeSut(fakeFieldName)

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError(fakeFieldName))
  })

  it('should return null if fieldName is in input', () => {
    const { sut } = makeSut(fakeFieldName)

    const result = sut.validate({ [fakeFieldName]: faker.random.word() })

    expect(result).toBe(null)
  })
})
