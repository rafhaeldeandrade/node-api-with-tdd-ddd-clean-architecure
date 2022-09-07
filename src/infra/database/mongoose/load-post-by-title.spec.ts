import { faker } from '@faker-js/faker'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { MongooseLoadPostByTitle } from '@/infra/database/mongoose/load-post-by-title'
import { mongoosePostModel } from '@/infra/database/mongoose/schemas/post'

interface SutTypes {
  sut: LoadPostByTitleRepository
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseLoadPostByTitle()
  }
}

const fakeParam = faker.word.noun()
describe('MongooseLoadPostByTitleRepository', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called load', () => {
    const { sut } = makeSut()

    expect(sut.load).toBeDefined()
  })

  it('should call mongoosePostModel with the correct param', async () => {
    const { sut } = makeSut()
    const findOneSpy = jest
      .spyOn(mongoosePostModel, 'findOne')
      .mockResolvedValueOnce(null as any)

    await sut.load(fakeParam)

    expect(findOneSpy).toHaveBeenCalledWith({ title: fakeParam }, null, {
      lean: true
    })
  })
})
