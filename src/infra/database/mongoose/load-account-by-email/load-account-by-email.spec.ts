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
})
