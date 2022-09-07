import { PostModel } from '@/domain/models/post'

export interface AddPostModel {
  title: string
  subtitle: string
  postDate: Date
  categories: string[]
  authorId: number
  post: string
}

export interface AddPostOutput extends Omit<PostModel, 'post'> {}

export interface AddPost {
  add: (params: AddPostModel) => Promise<AddPostOutput | null>
}
