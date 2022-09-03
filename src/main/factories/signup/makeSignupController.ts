import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { Argon2Adapter } from '@/infra/cryptography/argon2/argon2-adapter'
import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'
import { SignupController } from '@/presentation/controllers/signup'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'
import { Controller } from '@/presentation/contracts/controller'
import { makeSignupValidationComposite } from '@/main/factories/signup/makeSignupValidationComposite'
import env from '@/main/config/env'
import { MongooseLoadAccountByEmail } from '@/infra/database/mongoose/load-account-by-email/load-account-by-email'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { MongooseUpdateAccessToken } from '@/infra/database/mongoose/update-access-token/update-access-token'

export function makeSignupController(): Controller {
  const loadAccountByEmail = new MongooseLoadAccountByEmail()
  const argon2Adapter = new Argon2Adapter(env.argon2Options)
  const mongooseAddAccount = new MongooseAddAccount()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const mongooseUpdateAccessToken = new MongooseUpdateAccessToken()
  const dbAddAccount = new DbAddAccount(
    loadAccountByEmail,
    argon2Adapter,
    mongooseAddAccount,
    jwtAdapter,
    mongooseUpdateAccessToken
  )
  const mongooseLogError = new MongooseLogError()
  const signupController = new SignupController(
    dbAddAccount,
    makeSignupValidationComposite()
  )
  return new LogErrorDecoratorController(signupController, mongooseLogError)
}
