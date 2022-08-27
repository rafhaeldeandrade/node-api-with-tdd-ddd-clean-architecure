import request from 'supertest'
import { faker } from '@faker-js/faker'

import { mongooseHelper } from '@/infra/database/mongoose/helpers/mongoose-helper'
import { app } from '@/main/config/app'
import { mongooseAccountModel } from '@/infra/database/mongoose/schemas/account'

describe('Signup endToEnd', () => {
  beforeAll(async () => {
    await mongooseHelper.connect(
      'mongodb://user_mongodb_59ea38b9ed:9b49c9d30fcfea691c728c9ef916adc4fdf2bf8d@h1.host.filess.io:27017/mongodb_19b2306cfc'
    )
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

    const response = await request(app).post('/api/signup').send(account)

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(account.name)
    expect(response.body.email).toBe(account.email)
    expect(response.body.password).toBeTruthy()
    expect(response.body.id).toBeTruthy()
  })
})
