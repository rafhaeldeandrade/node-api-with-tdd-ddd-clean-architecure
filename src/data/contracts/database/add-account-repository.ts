import { AccountModel, Roles } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'

export interface AddAccountRepositoryInput extends AddAccountModel {
  role: Roles
}

export interface AddAccountRepository {
  add: (accountData: AddAccountRepositoryInput) => Promise<AccountModel>
}
