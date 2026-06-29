import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import type { Response } from 'express'
import jwt from 'jsonwebtoken'
import { db, toPublicUser, type PublicUser, type UserRow } from './db.js'
import { loginSchema, signupSchema } from './validation.js'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-only-change-me'
const BCRYPT_ROUNDS = 12

export type AuthTokenPayload = {
  sub: string
  email: string
}

export function createAuthToken(user: PublicUser): string {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function formatZodErrors(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const fieldErrors = error.flatten().fieldErrors
  const fields: Record<string, string> = {}

  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) {
      fields[field] = messages[0]
    }
  }

  return fields
}

export async function registerUser(input: {
  fullName: string
  company: string
  email: string
  password: string
}): Promise<{ user: PublicUser; token: string }> {
  const parsed = signupSchema.safeParse(input)

  if (!parsed.success) {
    const error = new Error('Validation failed') as Error & {
      status: number
      fields: Record<string, string>
    }
    error.status = 400
    error.fields = formatZodErrors(parsed.error)
    throw error
  }

  const { fullName, company, email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  const existing = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(normalizedEmail) as { id: string } | undefined

  if (existing) {
    const error = new Error('An account with this email already exists') as Error & {
      status: number
      field: string
    }
    error.status = 409
    error.field = 'email'
    throw error
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
  const id = randomUUID()

  db.prepare(
    `INSERT INTO users (id, full_name, company, email, password_hash)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, fullName, company, normalizedEmail, passwordHash)

  const row = db
    .prepare('SELECT id, full_name, company, email, password_hash, created_at FROM users WHERE id = ?')
    .get(id) as {
    id: string
    full_name: string
    company: string
    email: string
    password_hash: string
    created_at: string
  }

  const user = toPublicUser(row)
  const token = createAuthToken(user)

  return { user, token }
}

export async function loginUser(input: {
  email: string
  password: string
}): Promise<{ user: PublicUser; token: string }> {
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    const error = new Error('Validation failed') as Error & {
      status: number
      fields: Record<string, string>
    }
    error.status = 400
    error.fields = formatZodErrors(parsed.error)
    throw error
  }

  const { email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  const row = db
    .prepare('SELECT id, full_name, company, email, password_hash, created_at FROM users WHERE email = ?')
    .get(normalizedEmail) as UserRow | undefined

  if (!row) {
    const error = new Error('Invalid email or password') as Error & {
      status: number
    }
    error.status = 401
    throw error
  }

  const passwordMatches = await bcrypt.compare(password, row.password_hash)

  if (!passwordMatches) {
    const error = new Error('Invalid email or password') as Error & {
      status: number
    }
    error.status = 401
    throw error
  }

  const user = toPublicUser(row)
  const token = createAuthToken(user)

  return { user, token }
}

export function sendAuthError(res: Response, error: unknown) {
  if (error instanceof Error && 'fields' in error) {
    const authError = error as Error & { status: number; fields: Record<string, string> }
    return res.status(authError.status).json({
      message: error.message,
      fields: authError.fields,
    })
  }

  if (error instanceof Error && 'field' in error) {
    const authError = error as Error & { status: number; field: string }
    return res.status(authError.status).json({
      message: error.message,
      field: authError.field,
    })
  }

  if (error instanceof Error && 'status' in error) {
    const authError = error as Error & { status: number }
    return res.status(authError.status).json({
      message: error.message,
    })
  }

  console.error('Unexpected auth error:', error)
  return res.status(500).json({ message: 'Something went wrong. Please try again.' })
}
