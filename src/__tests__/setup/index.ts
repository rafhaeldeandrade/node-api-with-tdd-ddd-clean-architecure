import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'
import mongoose from 'mongoose'

export default {
  connect: async (): Promise<void> => {
    await mongoose.connect('mongodb://localhost:27017/clean-node-api-test')
  },

  disconnect: async (): Promise<void> => {
    await mongooseAccountModel.deleteMany({})
    await mongoose.disconnect()
  }
}
