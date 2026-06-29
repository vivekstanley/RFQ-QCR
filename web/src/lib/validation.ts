export type SignupFormData = {
  fullName: string
  company: string
  email: string
  password: string
}

export type SignupFieldErrors = Partial<Record<keyof SignupFormData | 'terms', string>>

export function validateSignupForm(
  data: SignupFormData,
  acceptedTerms: boolean,
): SignupFieldErrors {
  const errors: SignupFieldErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required'
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters'
  }

  if (!data.company.trim()) {
    errors.company = 'Company name is required'
  } else if (data.company.trim().length < 2) {
    errors.company = 'Company name must be at least 2 characters'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!data.password) {
    errors.password = 'Password is required'
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!/[a-zA-Z]/.test(data.password)) {
    errors.password = 'Password must include at least one letter'
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Password must include at least one number'
  }

  if (!acceptedTerms) {
    errors.terms = 'You must accept the terms to create an account'
  }

  return errors
}

export function hasFieldErrors(errors: SignupFieldErrors): boolean {
  return Object.keys(errors).length > 0
}
