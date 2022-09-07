import { AddPostController } from './add-post'

interface SutTypes {
  sut: AddPostController
}

function makeSut(): SutTypes {
  const sut = new AddPostController()
  return {
    sut
  }
}

describe('addPostController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
