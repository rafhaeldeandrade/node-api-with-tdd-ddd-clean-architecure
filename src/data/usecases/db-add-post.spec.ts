import { DbAddPost } from '@/data/usecases/db-add-post'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { PostModel } from '@/domain/models/post'
import { faker } from '@faker-js/faker'
import { GenerateUrlSlug } from '@/data/contracts/utils/generate-url-slug'

class LoadPostByTitleRepositoryStub implements LoadPostByTitleRepository {
  async load(title: string): Promise<PostModel | null> {
    return null
  }
}

class GenerateUrlSlugStub implements GenerateUrlSlug {
  generate(title: string): string {
    return faker.lorem.slug()
  }
}

interface SutTypes {
  sut: DbAddPost
  loadPostByTitleRepositoryStub: LoadPostByTitleRepository
  generateUrlSlugStub: GenerateUrlSlug
}

function makeSut(): SutTypes {
  const loadPostByTitleRepositoryStub = new LoadPostByTitleRepositoryStub()
  const generateUrlSlugStub = new GenerateUrlSlugStub()
  const sut = new DbAddPost(loadPostByTitleRepositoryStub, generateUrlSlugStub)
  return {
    sut,
    loadPostByTitleRepositoryStub,
    generateUrlSlugStub
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

  it('should return null if loadPostByTitleRepository returns a previously created post', async () => {
    const { sut, loadPostByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadPostByTitleRepositoryStub, 'load').mockResolvedValueOnce({
      id: faker.datatype.number().toString(),
      ...fakeParams
    })

    const result = await sut.add(fakeParams)

    expect(result).toBeNull()
  })

  it('should call generateUrlSlug.generate with correct param when loadPostByTitleRepository dont return a post', async () => {
    const { sut, generateUrlSlugStub } = makeSut()
    const generateSpy = jest.spyOn(generateUrlSlugStub, 'generate')

    await sut.add(fakeParams)

    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledWith(fakeParams.title)
  })
})
