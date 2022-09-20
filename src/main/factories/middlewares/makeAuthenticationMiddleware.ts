import { z } from 'zod'
import env from '@/main/config/env'
import { Controller } from '@/presentation/contracts/controller'
import { ZodSchemaValidation } from '@/presentation/helpers/validators/zod-schema-validation'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { DbLoadAccountByTokenUseCase } from '@/data/usecases/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { MongooseLoadAccountByToken } from '@/infra/database/mongoose/load-account-by-token'

export function makeAuthenticationMiddleware(): Controller {
  const zodSchema = z.object({
    'x-access-token': z.string().min(1)
  })
  const zodValidator = new ZodSchemaValidation(zodSchema)
  const jwtDecrypter = new JwtAdapter(env.jwtSecret)
  const mongoLoadAccountByTokenRepository = new MongooseLoadAccountByToken()
  const usecase = new DbLoadAccountByTokenUseCase(
    jwtDecrypter,
    mongoLoadAccountByTokenRepository
  )
  return new AuthenticationMiddleware(zodValidator, usecase)
}
