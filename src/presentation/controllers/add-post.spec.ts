import { faker } from '@faker-js/faker'
import { Validation } from '@/presentation/contracts/validation'
import { AddPostController } from '@/presentation/controllers/add-post'
import {
  badRequest,
  conflict,
  created
} from '@/presentation/helpers/http/http-helper'
import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'
import { PostAlreadyExistsError } from '@/presentation/errors/post-already-exists-error'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

const fakeAddPostUseCaseStubOutput = {
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  postDate: faker.date.past(),
  categories: [faker.lorem.word()],
  authorId: faker.datatype.number(10000).toString()
}
class AddPostUseCaseStub implements AddPost {
  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    return fakeAddPostUseCaseStubOutput
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

  it('should return 409 if a post with the provided title already exists', async () => {
    const { sut, addPostUseCaseStub } = makeSut()
    addPostUseCaseStub.add = jest.fn().mockReturnValueOnce(null)

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(
      conflict(new PostAlreadyExistsError(httpRequest.body.title))
    )
  })

  it('should return 201 on success', async () => {
    const { sut } = makeSut()

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(
      created(fakeAddPostUseCaseStubOutput)
    )
  })

  it('should return 500 if something in usecase throws', async () => {
    const { sut, addPostUseCaseStub } = makeSut()
    const error = new Error('any_error')
    addPostUseCaseStub.add = jest.fn().mockImplementationOnce(() => {
      throw error
    })

    const promise = sut.handle(httpRequest)

    await expect(promise).resolves.toEqual(badRequest(error))
  })
})
