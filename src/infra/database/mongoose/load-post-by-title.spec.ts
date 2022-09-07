import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { MongooseLoadPostByTitle } from './load-post-by-title'

interface SutTypes {
  sut: LoadPostByTitleRepository
}

function makeSut(): SutTypes {
  return {
    sut: new MongooseLoadPostByTitle()
  }
}

describe('MongooseLoadPostByTitleRepository', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
