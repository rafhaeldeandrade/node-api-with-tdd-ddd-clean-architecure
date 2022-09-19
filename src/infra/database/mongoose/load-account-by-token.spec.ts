import { MongooseLoadAccountByToken } from '@/infra/database/mongoose/load-account-by-token'
import { faker } from '@faker-js/faker'
import { mongooseAccountModel } from './schemas/account'

describe('MongooseLoadAccountByToken', () => {
  it('should be defined', () => {
    const sut = new MongooseLoadAccountByToken()
    expect(sut).toBeDefined()
  })

  it('should have a method called load', () => {
    const sut = new MongooseLoadAccountByToken()
    expect(sut.load).toBeDefined()
  })

  it('should call mongooseAccountModel.findOne with correct values', async () => {
    const sut = new MongooseLoadAccountByToken()
    const fakeToken = faker.datatype.uuid()
    const findOneSpy = jest
      .spyOn(mongooseAccountModel, 'findOne')
      .mockResolvedValueOnce(null)

    await sut.load(fakeToken)

    expect(findOneSpy).toHaveBeenCalledWith(
      { accessToken: fakeToken },
      {},
      { lean: true }
    )
  })

  it('should return null mongooseAccountModel.findOne returns null', async () => {
    const sut = new MongooseLoadAccountByToken()
    const fakeToken = faker.datatype.uuid()
    mongooseAccountModel.findOne = jest.fn().mockResolvedValueOnce(null)

    const promise = sut.load(fakeToken)

    await expect(promise).resolves.toBeNull()
  })
})
