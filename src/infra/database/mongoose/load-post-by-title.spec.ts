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

const fakePost = {
  _id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  postDate: faker.date.past(),
  categories: [faker.lorem.word()],
  authorId: faker.datatype.uuid(),
  post: faker.lorem.paragraph(),
  urlSlug: faker.lorem.slug()
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

  it('should return null if findOne returns null', async () => {
    const { sut } = makeSut()
    jest.spyOn(mongoosePostModel, 'findOne').mockResolvedValueOnce(null)

    const promise = sut.load(fakeParam)

    await expect(promise).resolves.toBeNull()
  })

  it('should throw if mongoosePostModel throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(mongoosePostModel, 'findOne').mockRejectedValueOnce(new Error())

    const promise = sut.load(fakeParam)

    await expect(promise).rejects.toThrow()
  })

  it('should return a post on success', async () => {
    const { sut } = makeSut()
    jest.spyOn(mongoosePostModel, 'findOne').mockResolvedValueOnce(fakePost)

    const promise = sut.load(fakeParam)

    const { _id, ...postWithoutId } = fakePost
    await expect(promise).resolves.toEqual({
      ...postWithoutId,
      id: _id.toString()
    })
  })
})
