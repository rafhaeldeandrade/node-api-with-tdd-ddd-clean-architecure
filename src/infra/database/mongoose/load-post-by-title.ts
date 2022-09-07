import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { PostModel } from '@/domain/models/post'
import { mongoosePostModel } from '@/infra/database/mongoose/schemas/post'

export class MongooseLoadPostByTitle implements LoadPostByTitleRepository {
  async load(postTitle: string): Promise<PostModel | null> {
    await mongoosePostModel.findOne({ title: postTitle }, null, { lean: true })
    return null
  }
}
