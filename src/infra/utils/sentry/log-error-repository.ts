import * as Sentry from '@sentry/node'
import { LogErrorRepository } from '@/data/contracts/database/log-error-repository'

export class SentryLogError implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    Sentry.captureException(stack)
  }
}
