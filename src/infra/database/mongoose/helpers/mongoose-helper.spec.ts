import mongoose from 'mongoose'
import { mongooseHelper as sut } from '@/infra/database/mongoose/helpers/mongoose-helper'

describe('Mongoose Helper', () => {
  afterEach(async () => {
    await mongoose.disconnect()
  })

  it('should connect succesfully', async () => {
    await sut.connect('mongodb://localhost:27017/test')

    expect(mongoose.connection.readyState).toBe(1)
  })

  it('should disconnect succesfully', async () => {
    await sut.connect('mongodb://localhost:27017/test')
    await sut.disconnect()

    expect(mongoose.connection.readyState).toBe(0)
  })

  it('should return undefined when trying to connect if a connection already exists', async () => {
    await sut.connect('mongodb://localhost:27017/test')
    const result = await sut.connect('mongodb://localhost:27017/test')

    expect(result).toBeUndefined()
  })

  it('should throw an error when trying to connect if no URL is provided', async () => {
    const result = sut.connect('')

    await expect(result).rejects.toThrowError('Mongo URL is required')
  })
})
