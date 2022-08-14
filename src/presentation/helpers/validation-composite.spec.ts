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

describe('ValidationComposite', () => {
  it('should be defined', () => {
    const sut = new ValidationComposite(fakeValidators)

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const sut = new ValidationComposite(fakeValidators)

    expect(sut.validate).toBeDefined()
  })

  it('should return an error if validate fails', () => {
    const sut = new ValidationComposite(fakeValidators)

    jest
      .spyOn(ValidationStub.prototype, 'validate')
      .mockImplementationOnce(() => new MissingParamError('field1'))

    const result = sut.validate({})

    expect(result).toEqual(new MissingParamError('field1'))
  })
})
