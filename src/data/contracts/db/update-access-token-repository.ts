export interface UpdateAccessTokenRepository {
  update: (accountId: string, token: string) => Promise<void>
}
