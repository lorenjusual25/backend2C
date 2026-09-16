import 'dotenv/config'
import { PORT,connectDB } from'./config/config.js'
import app from './app.js'
await connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})