import { z } from 'zod'
import { Controller } from '@/presentation/contracts/controller'
import { ZodSchemaValidation } from '@/presentation/helpers/validators/zod-schema-validation'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { DbAddPost } from '@/data/usecases/db-add-post'
import { MongooseLoadPostByTitle } from '@/infra/database/mongoose/load-post-by-title'
import { GenerateUrlSlug } from '@/infra/utils/url-slug/generate-url-slug'
import { MongooseAddPost } from '@/infra/database/mongoose/add-post'
import { AddPostController } from '@/presentation/controllers/add-post'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'

export function makeAddPostController(): Controller {
  const zodSchema = z.object({
    title: z.string().min(5).max(30),
    subtitle: z.string().min(5).max(30),
    postDate: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    }, z.date()),
    categories: z.array(z.string()),
    post: z.string().min(100).max(3000),
    authorId: z.string().min(1)
  })
  const zodValidator = new ZodSchemaValidation(zodSchema)
  const loadPostByTitle = new MongooseLoadPostByTitle()
  const generateUrlSlug = new GenerateUrlSlug()
  const addPost = new MongooseAddPost()
  const usecase = new DbAddPost(loadPostByTitle, generateUrlSlug, addPost)
  const addPostController = new AddPostController(zodValidator, usecase)
  const logErrorRepository = new MongooseLogError()
  return new LogErrorDecoratorController(addPostController, logErrorRepository)
}
