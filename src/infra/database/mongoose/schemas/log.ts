import mongoose from 'mongoose'

const logSchema = new mongoose.Schema(
  {
    stack: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const mongooseLogModel = mongoose.model('Log', logSchema)
