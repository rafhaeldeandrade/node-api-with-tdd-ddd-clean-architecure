import { Router, RequestHandler } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddPostController } from '@/main/factories/add-post/makeAddPostController'

export default function (router: Router): void {
  router.post('/posts', adaptRoute(makeAddPostController()) as RequestHandler)
}
