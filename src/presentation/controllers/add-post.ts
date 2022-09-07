import { AddPost } from '@/domain/usecases/add-post'
import { Controller } from '@/presentation/contracts/controller'
import { httpRequest, httpResponse } from '@/presentation/contracts/http'
import { Validation } from '@/presentation/contracts/validation'
import { badRequest } from '@/presentation/helpers/http/http-helper'

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
    await this.addPostUseCase.add({
      title,
      subtitle,
      postDate,
      categories,
      post,
      authorId
    })
    return '' as unknown as httpResponse
  }
}
