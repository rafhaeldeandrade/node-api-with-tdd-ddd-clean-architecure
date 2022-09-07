import { faker } from '@faker-js/faker'
import { Validation } from '@/presentation/contracts/validation'
import { AddPostController } from '@/presentation/controllers/add-post'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

class AddPostUseCaseStub implements AddPost {
  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      postDate: faker.date.past(),
      categories: [faker.lorem.word()],
      authorId: faker.datatype.number(10000)
    }
  }
}

interface SutTypes {
  sut: AddPostController
  validationStub: Validation
  addPostUseCaseStub: AddPost
}

function makeSut(): SutTypes {
  const validationStub = new ValidationStub()
  const addPostUseCaseStub = new AddPostUseCaseStub()
  const sut = new AddPostController(validationStub, addPostUseCaseStub)
  return {
    sut,
    validationStub,
    addPostUseCaseStub
  }
}

const fakeStringArray = Array(3)
  .fill('')
  .map(() => faker.random.word())
const httpRequest = {
  body: {
    title: faker.lorem.sentence(),
    subtitle: faker.lorem.sentence(),
    postDate: faker.date.past(),
    categories: fakeStringArray,
    post: faker.lorem.paragraphs(10),
    authorId: faker.datatype.number(10000)
  },
  headers: {
    accesstoken: faker.datatype.uuid()
  }
}

describe('addPostController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  it('should have a method called handle', () => {
    const { sut } = makeSut()

    expect(sut.handle).toBeDefined()
  })

  it('should call validation.validate with correct params', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if validation.validate returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    validationStub.validate = jest.fn().mockReturnValueOnce(error)

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(badRequest(error))
  })

  it('should call addPostUseCase with correct params', async () => {
    const { sut, addPostUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(addPostUseCaseStub, 'add')

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
