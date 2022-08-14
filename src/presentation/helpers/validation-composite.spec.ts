import { faker } from '@faker-js/faker'
import { MissingParamError } from '../errors/missing-param-error'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

class ValidationStub implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error | null {
    return null
  }
}

const fakeValidators = [
  new ValidationStub('field1'),
  new ValidationStub('field2')
]

interface SutTypes {
  sut: ValidationComposite
}

function makeSut(): SutTypes {
  const sut = new ValidationComposite(fakeValidators)
  return {
    sut
  }
}

describe('ValidationComposite', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const { sut } = makeSut()

    expect(sut.validate).toBeDefined()
  })

  it('should return an error if validate fails', () => {
    const { sut } = makeSut()

    jest
      .spyOn(ValidationStub.prototype, 'validate')
      .mockImplementationOnce(() => new MissingParamError('field1'))

    const result = sut.validate({})

    expect(result).toEqual(new MissingParamError('field1'))
  })

  it('should return null on success', () => {
    const { sut } = makeSut()

    const result = sut.validate({
      field1: faker.random.word(),
      field2: faker.random.word()
    })

    expect(result).toBe(null)
  })
})
