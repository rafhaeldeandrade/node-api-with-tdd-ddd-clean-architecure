import mongoose from 'mongoose'
import { mongooseHelper as sut } from '@/infra/database/mongoose/helpers/mongoose-helper'
import env from '@/main/config/env'

describe('Mongoose Helper', () => {
  afterEach(async () => {
    await mongoose.disconnect()
  })

  it('should connect succesfully', async () => {
    await sut.connect(env.mongoUrl)

    expect(mongoose.connection.readyState).toBe(1)
  })

  it('should disconnect succesfully', async () => {
    await sut.connect(env.mongoUrl)
    await sut.disconnect()

    expect(mongoose.connection.readyState).toBe(0)
  })

  it('should return undefined when trying to connect if a connection already exists', async () => {
    await sut.connect(env.mongoUrl)
    const result = await sut.connect(env.mongoUrl)

    expect(result).toBeUndefined()
  })

  it('should throw an error when trying to connect if no URL is provided', async () => {
    const result = sut.connect('')

    await expect(result).rejects.toThrowError('Mongo URL is required')
  })
})
