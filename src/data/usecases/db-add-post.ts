import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { SlugGenerator } from '@/data/contracts/utils/slug-generator'
import { AddPostRepository } from '@/data/contracts/database/add-post-repository'

export class DbAddPost implements AddPost {
  constructor(
    private readonly loadPostByTitleRepository: LoadPostByTitleRepository,
    private readonly generateUrlSlug: SlugGenerator,
    private readonly addPostRepository: AddPostRepository
  ) {}

  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    const foundPost = await this.loadPostByTitleRepository.load(params.title)
    if (foundPost) return null
    const generatedUrlSlug = this.generateUrlSlug.generate(params.title)
    const savedPost = await this.addPostRepository.add({
      ...params,
      urlSlug: generatedUrlSlug
    })
    const { urlSlug, post, ...postWithoutUrlSlugAndPost } = savedPost
    return postWithoutUrlSlugAndPost
  }
}
