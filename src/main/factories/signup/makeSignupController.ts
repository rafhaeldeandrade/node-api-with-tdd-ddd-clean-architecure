import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { Argon2Adapter } from '@/infra/cryptography/argon2/argon2-adapter'
import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'
import { SignupController } from '@/presentation/controllers/signup'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'
import { Controller } from '@/presentation/contracts/controller'
import { makeSignupValidationComposite } from '@/main/factories/signup/makeSignupValidationComposite'
import env from '@/main/config/env'

export function makeSignupController(): Controller {
  const argon2Adapter = new Argon2Adapter(env.argon2Options)
  const mongooseAddAccount = new MongooseAddAccount()
  const dbAddAccount = new DbAddAccount(argon2Adapter, mongooseAddAccount)
  const mongooseLogError = new MongooseLogError()
  const signupController = new SignupController(
    dbAddAccount,
    makeSignupValidationComposite()
  )
  return new LogErrorDecoratorController(signupController, mongooseLogError)
}
