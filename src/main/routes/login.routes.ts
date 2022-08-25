import { Router, RequestHandler } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignupController } from '@/main/factories/signup/makeSignupController'
import { makeLoginController } from '@/main/factories/login/makeLoginController'

export default function (router: Router): void {
  router.post('/signup', adaptRoute(makeSignupController()) as RequestHandler)
  router.post('/login', adaptRoute(makeLoginController()) as RequestHandler)
}
