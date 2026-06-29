import { Router } from 'express'
import { loginUser, registerUser, sendAuthError } from '../auth.js'

export const authRouter = Router()

authRouter.post('/signup', async (req, res) => {
  try {
    const { fullName, company, email, password } = req.body ?? {}
    const result = await registerUser({ fullName, company, email, password })

    return res.status(201).json({
      message: 'Account created successfully',
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    return sendAuthError(res, error)
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {}
    const result = await loginUser({ email, password })

    return res.status(200).json({
      message: 'Logged in successfully',
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    return sendAuthError(res, error)
  }
})
