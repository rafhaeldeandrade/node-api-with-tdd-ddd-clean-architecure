import { SlugGenerator } from '@/data/contracts/utils/slug-generator'
import { GenerateUrlSlug } from '@/infra/utils/url-slug/generate-url-slug'

interface SutTypes {
  sut: SlugGenerator
}

function makeSut(): SutTypes {
  return {
    sut: new GenerateUrlSlug()
  }
}

const fakeValue = 'Como criar um prójeto com Typescript, Jest e TDD'

describe('GenerateUrlSlug', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called generate', () => {
    const { sut } = makeSut()

    expect(sut.generate).toBeDefined()
  })

  it('should return a slugfied value', () => {
    const { sut } = makeSut()

    const result = sut.generate(fakeValue)

    expect(result).toBe('como-criar-um-projeto-com-typescript-jest-e-tdd')
  })
})
