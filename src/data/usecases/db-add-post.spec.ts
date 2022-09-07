import { DbAddPost } from '@/data/usecases/db-add-post'

interface SutTypes {
  sut: DbAddPost
}

function makeSut(): SutTypes {
  const sut = new DbAddPost()
  return {
    sut
  }
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
})
