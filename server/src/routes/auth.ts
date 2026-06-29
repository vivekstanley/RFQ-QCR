import { Router } from 'express'
import { registerUser, sendAuthError } from '../auth.js'

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
