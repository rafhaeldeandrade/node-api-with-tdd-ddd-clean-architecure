import { Router, RequestHandler } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignupController } from '@/main/factories/makeSignupController'

export default function (router: Router): void {
  router.post('/signup', adaptRoute(makeSignupController()) as RequestHandler)
}
