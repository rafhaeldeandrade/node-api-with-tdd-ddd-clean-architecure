import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'

describe('LogErrorDecoratorController', () => {
  it('should be defined', () => {
    const sut = new LogErrorDecoratorController()

    expect(sut).toBeDefined()
  })
})
