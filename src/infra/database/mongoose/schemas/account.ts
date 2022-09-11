import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'writer', 'reader'],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const mongooseAccountModel = mongoose.model('Account', accountSchema)
