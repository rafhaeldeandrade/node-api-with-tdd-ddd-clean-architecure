import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    postDate: { type: Date, required: true },
    categories: { type: [String], required: true },
    authorId: { type: String, required: true },
    post: { type: String, required: true },
    urlSlug: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const mongoosePostModel = mongoose.model('Post', postSchema)
