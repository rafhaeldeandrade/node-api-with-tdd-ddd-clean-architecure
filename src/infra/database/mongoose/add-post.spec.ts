import { AddPostRepository } from '@/data/contracts/database/add-post-repository'
import { MongooseAddPost } from '@/infra/database/mongoose/add-post'

interface SutTypes {
  sut: AddPostRepository
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseAddPost()
  }
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
})
