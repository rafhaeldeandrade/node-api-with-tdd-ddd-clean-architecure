import { PostModel } from '@/domain/models/post'

export interface AddPostModel {
  title: string
  subtitle: string
  postDate: Date
  categories: string[]
  authorId: string
  post: string
}

export interface AddPostOutput extends Omit<PostModel, 'post' | 'urlSlug'> {}

export interface AddPost {
  add: (params: AddPostModel) => Promise<AddPostOutput | null>
}
