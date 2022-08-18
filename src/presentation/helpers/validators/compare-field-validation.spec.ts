import { CompareFieldValidation } from '@/presentation/helpers/validators/compare-field-validdation'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '../../errors/invalid-param-error'

interface SutTypes {
  sut: CompareFieldValidation
}

function makeSut(fieldName: string, fieldToCompareName: string): SutTypes {
  const sut = new CompareFieldValidation(fieldName, fieldToCompareName)
  return {
    sut
  }
}
const fakeFieldName = faker.random.word()
const fakeToCompareName = faker.random.word()

describe('CompareFieldValidation', () => {
  it('should be defined', () => {
    const { sut } = makeSut(fakeFieldName, fakeToCompareName)

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const { sut } = makeSut(fakeFieldName, fakeToCompareName)

    expect(sut.validate).toBeDefined()
  })

  it('should return InvalidParamError if fieldToCompareName isnt the same as fieldName', () => {
    const { sut } = makeSut(fakeFieldName, fakeToCompareName)
    const fakeFieldNameValue = faker.datatype.number()
    const fakeFieldToCompareNameValue = faker.datatype.number()

    const error = sut.validate({
      [fakeFieldName]: fakeFieldNameValue,
      [fakeToCompareName]: fakeFieldToCompareNameValue
    })

    expect(error).toEqual(new InvalidParamError(fakeToCompareName))
  })

  it("should return null if fieldName's value is equal to fieldToCompareName's value", () => {
    const { sut } = makeSut(fakeFieldName, fakeToCompareName)
    const fakeValue = faker.datatype.number()

    const result = sut.validate({
      [fakeFieldName]: fakeValue,
      [fakeToCompareName]: fakeValue
    })

    expect(result).toBe(null)
  })
})
