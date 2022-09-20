import { Router, RequestHandler } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddPostController } from '@/main/factories/add-post/makeAddPostController'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware'
import { Roles } from '@/domain/models/account'

export default function (router: Router): void {
  const authorizedRoles = ['admin', 'moderator', 'writer'] as Roles[]
  router.post(
    '/posts',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    adaptMiddleware(makeAuthenticationMiddleware(authorizedRoles)),
    adaptRoute(makeAddPostController()) as RequestHandler
  )
}
