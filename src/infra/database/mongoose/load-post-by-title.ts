import { LoadPostByTitleRepository } from '@/data/contracts/database/load-post-by-title-repository'
import { PostModel } from '@/domain/models/post'
import { mongoosePostModel } from '@/infra/database/mongoose/schemas/post'

export class MongooseLoadPostByTitle implements LoadPostByTitleRepository {
  async load(postTitle: string): Promise<PostModel | null> {
    const savedPost = await mongoosePostModel.findOne(
      { title: postTitle },
      null,
      { lean: true }
    )
    if (!savedPost) return null
    return {
      id: savedPost._id.toString(),
      title: savedPost.title,
      subtitle: savedPost.subtitle,
      postDate: savedPost.postDate,
      categories: savedPost.categories,
      authorId: savedPost.authorId,
      post: savedPost.post,
      urlSlug: savedPost.urlSlug
    }
  }
}
