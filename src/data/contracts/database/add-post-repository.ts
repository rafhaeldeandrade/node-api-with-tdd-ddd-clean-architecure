import { PostModel } from '@/domain/models/post'
import { AddPostModel } from '@/domain/usecases/add-post'

export interface AddPostRepositoryInput extends AddPostModel {
  urlSlug: string
}

export interface AddPostRepository {
  add: (postData: AddPostRepositoryInput) => Promise<PostModel>
}
