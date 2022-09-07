import { AddPost } from '@/domain/usecases/add-post'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { Validation } from '@/presentation/contracts/validation'
import { badRequest, conflict } from '@/presentation/helpers/http/http-helper'
import { PostAlreadyExistsError } from '../errors/post-already-exists-error'

export class AddPostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPostUseCase: AddPost
  ) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    const error = this.validation.validate(params.body)
    if (error) return badRequest(error)
    const { title, subtitle, postDate, categories, post, authorId } =
      params.body
    const savedPost = await this.addPostUseCase.add({
      title,
      subtitle,
      postDate,
      categories,
      post,
      authorId
    })
    const postAlreadyExists = !savedPost
    if (postAlreadyExists) return conflict(new PostAlreadyExistsError(title))
    return '' as unknown as httpResponse
  }
}
