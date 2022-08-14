import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should be defined', () => {
    const sut = new ValidationComposite()

    expect(sut).toBeDefined()
  })

  it('should have a method called validate', () => {
    const sut = new ValidationComposite()

    expect(sut.validate).toBeDefined()
  })
})
