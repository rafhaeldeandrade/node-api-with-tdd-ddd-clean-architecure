import { CompareFieldValidation } from '@/presentation/helpers/compare-field-validdation'

interface SutTypes {
  sut: CompareFieldValidation
}

function makeSut(): SutTypes {
  const sut = new CompareFieldValidation()
  return {
    sut
  }
}

describe('CompareFieldValidation', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const { sut } = makeSut()

    expect(sut.validate).toBeDefined()
  })
})
