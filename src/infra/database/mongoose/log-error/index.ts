import { LogErrorRepository } from '@/data/contracts/database/log-error-repository'
import { mongooseLogModel } from '@/infra/database/mongoose/schemas/log'

export class MongooseLogError implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await mongooseLogModel.create({ stack })
  }
}
