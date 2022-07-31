import { Encrypter } from '@/data/contracts/encrypter'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/add-account'
import { faker } from '@faker-js/faker'

class EncrypterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return await new Promise((resolve) => resolve('hashed_password'))
  }
}

interface SutTypes {
  sut: AddAccount
  encrypter: Encrypter
}

function makeSut(): SutTypes {
  const encrypter = new EncrypterStub()
  const sut = new DbAddAccount(encrypter)
  return { sut, encrypter }
}

const fakePassword = faker.internet.password()
const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword
}

describe('DbAddAccountUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a add method', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })

  it('should call encrypter with the correct password', async () => {
    const { sut, encrypter } = makeSut()

    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.add(fakeData)

    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith(fakePassword)
  })

  it('should throw an error if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()

    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(async () => {
      throw new Error()
    })
    const promise = sut.add(fakeData)

    await expect(promise).rejects.toThrow()
  })
})
