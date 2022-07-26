import request from 'supertest'
import { faker } from '@faker-js/faker'
import { mongooseHelper } from '@/infra/database/mongoose/helpers/mongoose-helper'
import { app } from '@/main/config/app'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

describe('Signup endToEnd', () => {
  beforeAll(async () => {
    await mongooseHelper.connect('mongodb://localhost:27018/clean-node-api')
  })

  afterAll(async () => {
    await mongooseAccountModel.deleteMany({})
    await mongooseHelper.disconnect()
  })

  it('should return 200 on success', async () => {
    const fakePassword = faker.internet.password()
    const account = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: fakePassword,
      passwordConfirmation: fakePassword
    }

    const response = await request(app).post('/api/v1/signup').send(account)

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(account.name)
    expect(response.body.email).toBe(account.email)
    expect(response.body.password).toBeTruthy()
    expect(response.body.id).toBeTruthy()
  })
})
