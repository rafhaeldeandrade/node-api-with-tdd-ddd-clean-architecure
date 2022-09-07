import {
  AddPost,
  AddPostModel,
  AddPostOutput
} from '@/domain/usecases/add-post'

export class DbAddPost implements AddPost {
  async add(params: AddPostModel): Promise<AddPostOutput | null> {
    return null
  }
}
