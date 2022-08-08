import { LogErrorRepository } from '@/data/contracts/log-error-repository'

export class MongooseLogError implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    console.log(stack)
  }
}
