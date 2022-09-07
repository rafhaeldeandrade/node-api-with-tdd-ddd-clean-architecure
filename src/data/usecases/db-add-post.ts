import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { GenerateUrlSlug } from '@/data/contracts/utils/generate-url-slug'

export class DbAddPost implements AddPost {
  constructor(
    private readonly loadPostByTitleRepository: LoadPostByTitleRepository,
    private readonly generateUrlSlug: GenerateUrlSlug
  ) {}

  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    await this.loadPostByTitleRepository.load(params.title)
    this.generateUrlSlug.generate(params.title)
    return null
  }
}
