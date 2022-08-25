import { Argon2Adapter } from '@/infra/cryptography/argon2/argon2-adapter'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'
import { Controller } from '@/presentation/contracts/controller'
import { makeLoginValidationComposite } from './makeLoginValidationComposite'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { MongooseLoadAccountByEmail } from '@/infra/database/mongoose/load-account-by-email/load-account-by-email'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import env from '@/main/config/env'
import { MongooseUpdateAccessToken } from '@/infra/database/mongoose/update-access-token/update-access-token'
import { LoginController } from '@/presentation/controllers/login'

export function makeLoginController(): Controller {
  const loadAccountByEmailRepository = new MongooseLoadAccountByEmail()
  const hashComparer = new Argon2Adapter(env.argon2Options)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const updateAccessTokenRepository = new MongooseUpdateAccessToken()
  const authorization = new DbAuthentication(
    loadAccountByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  )
  const loginController = new LoginController(
    authorization,
    makeLoginValidationComposite()
  )
  const mongooseLogError = new MongooseLogError()
  return new LogErrorDecoratorController(loginController, mongooseLogError)
}
