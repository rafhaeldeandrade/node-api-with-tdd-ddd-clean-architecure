import {
  AddPostRepository,
  AddPostRepositoryInput
} from '@/data/contracts/database/add-post-repository'
import { PostModel } from '@/domain/models/post'
import { mongoosePostModel } from './schemas/post'

export class MongooseAddPost implements AddPostRepository {
  async add(params: AddPostRepositoryInput): Promise<PostModel> {
    const savedPost = await mongoosePostModel.create(params)
    const {
      title,
      subtitle,
      postDate,
      categories,
      authorId,
      urlSlug,
      post,
      _id
    } = savedPost
    return {
      id: _id.toString(),
      title,
      subtitle,
      postDate,
      categories,
      authorId,
      urlSlug,
      post
    }
  }
}
