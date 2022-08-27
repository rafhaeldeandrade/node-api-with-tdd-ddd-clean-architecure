import mongoose from 'mongoose'
import { mongooseHelper as sut } from '@/infra/database/mongoose/helpers/mongoose-helper'

describe('Mongoose Helper', () => {
  afterEach(async () => {
    await mongoose.disconnect()
  })

  it('should connect succesfully', async () => {
    await sut.connect(
      'mongodb://user_mongodb_59ea38b9ed:9b49c9d30fcfea691c728c9ef916adc4fdf2bf8d@h1.host.filess.io:27017/mongodb_19b2306cfc'
    )

    expect(mongoose.connection.readyState).toBe(1)
  })

  it('should disconnect succesfully', async () => {
    await sut.connect(
      'mongodb://user_mongodb_59ea38b9ed:9b49c9d30fcfea691c728c9ef916adc4fdf2bf8d@h1.host.filess.io:27017/mongodb_19b2306cfc'
    )
    await sut.disconnect()

    expect(mongoose.connection.readyState).toBe(0)
  })

  it('should return undefined when trying to connect if a connection already exists', async () => {
    await sut.connect(
      'mongodb://user_mongodb_59ea38b9ed:9b49c9d30fcfea691c728c9ef916adc4fdf2bf8d@h1.host.filess.io:27017/mongodb_19b2306cfc'
    )
    const result = await sut.connect(
      'mongodb://user_mongodb_59ea38b9ed:9b49c9d30fcfea691c728c9ef916adc4fdf2bf8d@h1.host.filess.io:27017/mongodb_19b2306cfc'
    )

    expect(result).toBeUndefined()
  })

  it('should throw an error when trying to connect if no URL is provided', async () => {
    const result = sut.connect('')

    await expect(result).rejects.toThrowError('Mongo URL is required')
  })
})
