import { DbAddPost } from '@/data/usecases/db-add-post'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { PostModel } from '@/domain/models/post'
import { faker } from '@faker-js/faker'

class LoadPostByTitleRepositoryStub implements LoadPostByTitleRepository {
  async load(title: string): Promise<PostModel | null> {
    return null
  }
}

interface SutTypes {
  sut: DbAddPost
  loadPostByTitleRepositoryStub: LoadPostByTitleRepository
}

function makeSut(): SutTypes {
  const loadPostByTitleRepositoryStub = new LoadPostByTitleRepositoryStub()
  const sut = new DbAddPost(loadPostByTitleRepositoryStub)
  return {
    sut,
    loadPostByTitleRepositoryStub
  }
}

const fakeParams = {
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  postDate: faker.date.past(),
  categories: [faker.lorem.word()],
  authorId: faker.datatype.number().toString(),
  post: faker.lorem.paragraph()
}

describe('AddPost Usecase', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called add', () => {
    const { sut } = makeSut()

    expect(sut.add).toBeDefined()
  })

  it('should call loadPostByTitleRepository with correct value', async () => {
    const { sut, loadPostByTitleRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadPostByTitleRepositoryStub, 'load')

    await sut.add(fakeParams)

    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(fakeParams.title)
  })
})
