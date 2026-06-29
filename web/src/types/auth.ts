export type PublicUser = {
  id: string
  fullName: string
  company: string
  email: string
  createdAt: string
}

export type SignupRequest = {
  fullName: string
  company: string
  email: string
  password: string
}

export type SignupResponse = {
  message: string
  user: PublicUser
  token: string
}

export type ApiErrorResponse = {
  message: string
  field?: string
  fields?: Record<string, string>
}

export class ApiError extends Error {
  field?: string
  fields?: Record<string, string>

  constructor(message: string, options?: { field?: string; fields?: Record<string, string> }) {
    super(message)
    this.name = 'ApiError'
    this.field = options?.field
    this.fields = options?.fields
  }
}
