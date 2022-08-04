import { mongooseHelper } from '@/infra/database/mongoose/helpers/mongoose-helper'
import { app } from '@/main/config/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'

describe('Signup endToEnd', () => {
  beforeAll(async () => {
    await mongooseHelper.connect(
      'mongodb://localhost:27017/node-clean-api-test'
    )
  })

  afterAll(async () => {
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

    console.log(response.body)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(account.name)
    expect(response.body.email).toBe(account.email)
    expect(response.body.password).toBeTruthy()
    expect(response.body.id).toBeTruthy()
  })
})
