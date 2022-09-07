import { PostModel } from '@/domain/models/post'

export interface LoadPostByTitleRepository {
  load: (postTitle: string) => Promise<PostModel | null>
}
