import { app } from '@/main/config/app'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.API_PORT ?? 4000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
