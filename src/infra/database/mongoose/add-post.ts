import {
  AddPostRepository,
  AddPostRepositoryInput
} from '@/data/contracts/database/add-post-repository'
import { PostModel } from '@/domain/models/post'
import { mongoosePostModel } from './schemas/post'

export class MongooseAddPost implements AddPostRepository {
  async add(params: AddPostRepositoryInput): Promise<PostModel> {
    await mongoosePostModel.create(params)
    return null as unknown as PostModel
  }
}
