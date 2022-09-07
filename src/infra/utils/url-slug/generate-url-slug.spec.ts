import { SlugGenerator } from '@/data/contracts/utils/slug-generator'
import { GenerateUrlSlug } from './generate-url-slug'

interface SutTypes {
  sut: SlugGenerator
}

function makeSut(): SutTypes {
  return {
    sut: new GenerateUrlSlug()
  }
}

describe('GenerateUrlSlug', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
