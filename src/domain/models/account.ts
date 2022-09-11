export type Roles = 'admin' | 'moderator' | 'writer' | 'reader'

export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  accessToken?: string
  role: Roles
}
