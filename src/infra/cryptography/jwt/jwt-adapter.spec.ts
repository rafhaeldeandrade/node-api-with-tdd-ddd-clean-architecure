import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { faker } from '@faker-js/faker'

const fakeValue = faker.datatype.uuid()
const fakeJwtSecret = faker.datatype.string(128)
interface SutTypes {
  sut: JwtAdapter
}
function makeSut(): SutTypes {
  const sut = new JwtAdapter(fakeJwtSecret)
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

  it('should call jwt.sign with correct params when encrypt method is invoked', () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(fakeValue)
    expect(jwtSpy).toHaveBeenCalledWith(fakeValue, fakeJwtSecret)
  })

  it('should throw if jwt.sign throws when encrypt method is invoked', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(() => sut.encrypt(fakeValue)).toThrow()
  })

  it('should have a method called decrypt', () => {
    const { sut } = makeSut()

    expect(sut.decrypt).toBeDefined()
  })

  it('should call jwt.verify with correct params if decrypt is called', () => {
    const { sut } = makeSut()
    const verifySpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementationOnce(() => null)

    sut.decrypt(fakeValue)

    expect(verifySpy).toHaveBeenCalledWith(fakeValue, fakeJwtSecret)
  })

  it('should return null if jwt.verify throws when decrypt method was called', () => {
    const { sut } = makeSut()
    jwt.verify = jest.fn().mockImplementationOnce(() => {
      throw new Error()
    })

    const result = sut.decrypt(fakeValue)

    expect(result).toBeNull()
  })

  it('should return payload on success when decrypt method was called', () => {
    const fakeValue = faker.datatype.uuid()
    const { sut } = makeSut()
    jwt.verify = jest.fn().mockReturnValueOnce(fakeValue)

    const result = sut.decrypt(fakeValue)

    expect(result).toEqual(fakeValue)
  })
})
