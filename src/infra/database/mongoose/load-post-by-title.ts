import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { PostModel } from '@/domain/models/post'

export class MongooseLoadPostByTitle implements LoadPostByTitleRepository {
  async load(postTitle: string): Promise<PostModel | null> {
    return null
  }
}
