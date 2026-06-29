import cors from 'cors'
import express from 'express'
import { authRouter } from './routes/auth.js'

const app = express()

const port = Number(process.env.PORT ?? 3001)
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(port, () => {
  console.log(`RFQ-QCR API listening on http://localhost:${port}`)
})
