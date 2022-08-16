import { CompareFieldValidation } from '@/presentation/helpers/compare-field-validdation'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '../errors/invalid-param-error'

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

    const error = sut.validate({
      [fakeFieldName]: 1,
      [fakeToCompareName]: 2
    })

    expect(error).toEqual(new InvalidParamError(fakeToCompareName))
  })
})
