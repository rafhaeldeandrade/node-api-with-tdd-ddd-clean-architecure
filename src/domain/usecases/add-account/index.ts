import { AccountModel } from '@/domain/models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccountUseCase {
  add: (params: AddAccountModel) => Promise<AccountModel>
}
