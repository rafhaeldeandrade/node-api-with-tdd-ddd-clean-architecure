import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { Argon2Adapter } from '@/infra/cryptography/argon2-adapter'
import { MongooseAddAccount } from '@/infra/database/mongoose/add-account'
import { SignupController } from '@/presentation/controllers/signup'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import argon2 from 'argon2'
import { LogErrorDecoratorController } from '@/main/decorators/log-error-decorator'
import { MongooseLogError } from '@/infra/database/mongoose/log-error'
import { Controller } from '@/presentation/contracts/controller'

export function makeSignupController(): Controller {
  const argon2Options = {
    type: argon2.argon2id,
    memoryCost: 37888,
    parallelism: 1,
    timeCost: 2
  }
  const emailValidator = new EmailValidatorAdapter()
  const argon2Adapter = new Argon2Adapter(argon2Options)
  const mongooseAddAccount = new MongooseAddAccount()
  const dbAddAccount = new DbAddAccount(argon2Adapter, mongooseAddAccount)
  const mongooseLogError = new MongooseLogError()
  const signupController = new SignupController(emailValidator, dbAddAccount)
  return new LogErrorDecoratorController(signupController, mongooseLogError)
}
