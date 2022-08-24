import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'

interface SutTypes {
  sut: JwtAdapter
}
function makeSut(): SutTypes {
  const sut = new JwtAdapter()
  return {
    sut
  }
}

describe('JwtAdapter', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called encrypt', () => {
    const { sut } = makeSut()
    expect(sut.encrypt).toBeDefined()
  })
})
