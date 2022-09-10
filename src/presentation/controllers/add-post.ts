import { AddPost } from '@/domain/usecases/add-post'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import {
  badRequest,
  conflict,
  created,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { SchemaValidation } from '@/presentation/contracts/schema-validation'
import { PostAlreadyExistsError } from '@/presentation/errors/post-already-exists-error'

export class AddPostController implements Controller {
  constructor(
    private readonly validation: SchemaValidation,
    private readonly addPostUseCase: AddPost
  ) {}

  async handle(params: httpRequest): Promise<httpResponse> {
    try {
      const error = await this.validation.validate(params.body)
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
      return created(savedPost)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
