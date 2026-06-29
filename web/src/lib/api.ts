import type { ApiErrorResponse, SignupRequest, SignupResponse } from '../types/auth'
import { ApiError } from '../types/auth'

const API_BASE = '/api'

async function parseErrorResponse(response: Response): Promise<ApiError> {
  let body: ApiErrorResponse | undefined

  try {
    body = (await response.json()) as ApiErrorResponse
  } catch {
    body = undefined
  }

  return new ApiError(body?.message ?? 'Request failed', {
    field: body?.field,
    fields: body?.fields,
  })
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw await parseErrorResponse(response)
  }

  return (await response.json()) as SignupResponse
}
