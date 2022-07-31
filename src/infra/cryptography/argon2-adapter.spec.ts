import { Encrypter } from '@/data/contracts/encrypter'
import { Argon2Adapter } from '@/infra/cryptography/argon2-adapter'
import { faker } from '@faker-js/faker'
import argon2 from 'argon2'

interface SutTypes {
  sut: Encrypter
}

function makeSut(options?: argon2.Options & { raw?: false }): SutTypes {
  const sut = new Argon2Adapter(options ?? { raw: false })

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

  it('should call argon2 with the correct params', async () => {
    const argon2Options = {
      type: argon2.argon2id,
      memoryCost: 37888,
      parallelism: 1,
      timeCost: 2
    }
    const { sut } = makeSut(argon2Options)

    const hashSpy = jest.spyOn(argon2, 'hash')

    const fakePassword = faker.internet.password()
    await sut.encrypt(fakePassword)

    expect(hashSpy).toHaveBeenCalledWith(fakePassword, argon2Options)
  })

  it('should return a hash on success', async () => {
    const argon2Options = {
      type: argon2.argon2id,
      memoryCost: 37888,
      parallelism: 1,
      timeCost: 2
    }

    const { sut } = makeSut(argon2Options)

    const hashedPassword = faker.datatype.uuid()
    jest
      .spyOn(argon2, 'hash')
      .mockImplementationOnce(async () => hashedPassword)

    const fakePassword = faker.internet.password()

    const hash = await sut.encrypt(fakePassword)

    expect(hash).toBe(hashedPassword)
  })

  it('should throw an error if argon2 throws', async () => {
    const argon2Options = {
      type: argon2.argon2id,
      memoryCost: 37888,
      parallelism: 1,
      timeCost: 2
    }

    const { sut } = makeSut(argon2Options)

    jest.spyOn(argon2, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })

    const fakePassword = faker.internet.password()
    const promise = sut.encrypt(fakePassword)

    await expect(promise).rejects.toThrow()
  })
})
