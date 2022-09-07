import { AddPostRepository } from '@/data/contracts/database/add-post-repository'
import { MongooseAddPost } from '@/infra/database/mongoose/add-post'
import { faker } from '@faker-js/faker'
import { mongoosePostModel } from '@/infra/database/mongoose/schemas/post'

interface SutTypes {
  sut: AddPostRepository
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseAddPost()
  }
}

const fakeAddPostInput = {
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  postDate: faker.date.past(),
  categories: [faker.lorem.word(), faker.lorem.word()],
  authorId: faker.datatype.uuid(),
  post: faker.lorem.paragraph(),
  urlSlug: faker.lorem.slug()
}

describe('MongooseAddPostRepository', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called add', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })

  it('should call mongoosePostModel with correct params', async () => {
    const { sut } = makeSut()
    const createSpy = jest
      .spyOn(mongoosePostModel, 'create')
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .mockImplementationOnce(async () => null)

    await sut.add(fakeAddPostInput)

    expect(createSpy).toHaveBeenCalledWith(fakeAddPostInput)
  })
})
