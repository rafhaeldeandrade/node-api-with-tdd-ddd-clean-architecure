import { app } from '@/main/config/app'
import testSetup from '@/__tests__/setup'
import { faker } from '@faker-js/faker'
import request from 'supertest'

describe('Signup endToEnd', () => {
  beforeAll(async () => {
    await testSetup.connect()
  })

  afterAll(async () => {
    await testSetup.disconnect()
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
