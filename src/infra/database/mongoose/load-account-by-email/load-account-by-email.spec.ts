import { AccountModel, Roles } from '@/domain/models/account'
import { MongooseLoadAccountByEmail } from '@/infra/database/mongoose/load-account-by-email/load-account-by-email'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: MongooseLoadAccountByEmail
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseLoadAccountByEmail()
  }
}

const fakeId: string = faker.datatype.uuid()
const fakePassword = faker.internet.password()
const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword,
  role: faker.helpers.arrayElement([
    'admin',
    'moderator',
    'writer',
    'reader'
  ]) as Roles
}

function makeAccount(): AccountModel {
  return {
    id: fakeId,
    name: fakeData.name,
    email: fakeData.email,
    password: 'hash' + fakeData.password,
    accessToken: faker.datatype.uuid(),
    role: fakeData.role
  }
}

const fakeParams = {
  email: faker.internet.email()
}
describe('MongooseLoadAccountByEmailRepository', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method called load', () => {
    const { sut } = makeSut()
    expect(sut.load).toBeDefined()
  })

  it('should call mongooseAccountModel with the correct param', async () => {
    const { sut } = makeSut()
    const findOneSpy = jest
      .spyOn(mongooseAccountModel, 'findOne')
      .mockResolvedValueOnce(null as any)

    await sut.load(fakeParams.email)

    expect(findOneSpy).toHaveBeenCalledWith({ email: fakeParams.email }, null, {
      lean: true
    })
  })

  it('should return null if findOne returns null', async () => {
    const { sut } = makeSut()
    jest.spyOn(mongooseAccountModel, 'findOne').mockResolvedValueOnce(null)

    const promise = sut.load(fakeParams.email)

    await expect(promise).resolves.toBeNull()
  })

  it('should throw if mongooseAccountModel throws', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(mongooseAccountModel, 'findOne')
      .mockRejectedValueOnce(new Error())

    const promise = sut.load(fakeParams.email)

    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const { id, password, ...accountWithoutId } = makeAccount()
    jest.spyOn(mongooseAccountModel, 'findOne').mockResolvedValueOnce({
      _id: id,
      password: 'hash' + password,
      ...accountWithoutId
    })

    const promise = sut.load(fakeParams.email)

    await expect(promise).resolves.toEqual({
      id,
      password: 'hash' + password,
      ...accountWithoutId
    })
  })
})
