import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'
import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'

export class DbAddPost implements AddPost {
  constructor(
    private readonly loadPostByTitleRepository: LoadPostByTitleRepository
  ) {}

  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    await this.loadPostByTitleRepository.load(params.title)
    return null
  }
}
