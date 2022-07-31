import { Encrypter } from '@/data/contracts/encrypter'
import { Argon2Adapter } from '@/infra/cryptography/argon2-adapter'

interface SutTypes {
  sut: Encrypter
}

function makeSut(): SutTypes {
  const sut = new Argon2Adapter()

  return {
    sut
  }
}

describe('Argon2Adapter', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called encrypt', () => {
    const { sut } = makeSut()

    expect(sut.encrypt).toBeDefined()
  })
})
