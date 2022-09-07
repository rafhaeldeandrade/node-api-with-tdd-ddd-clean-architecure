import {
  AddPostRepository,
  AddPostRepositoryInput
} from '@/data/contracts/database/add-post-repository'
import { PostModel } from '@/domain/models/post'

export class MongooseAddPost implements AddPostRepository {
  async add(params: AddPostRepositoryInput): Promise<PostModel> {
    return null as unknown as PostModel
  }
}
