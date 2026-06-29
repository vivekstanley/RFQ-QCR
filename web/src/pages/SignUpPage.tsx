import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { AuthCard, TextField } from '../components/AuthForm'
import { Footer } from '../components/Footer'
import { FormAlert } from '../components/FormAlert'
import { useAuth } from '../context/AuthContext'
import { hasFieldErrors, validateSignupForm, type SignupFieldErrors } from '../lib/validation'
import { ApiError } from '../types/auth'

export function SignUpPage() {
  const navigate = useNavigate()
  const { signup, isAuthenticated } = useAuth()

  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const errors = validateSignupForm(
      { fullName, company, email, password },
      acceptedTerms,
    )

    setFieldErrors(errors)

    if (hasFieldErrors(errors)) {
      return
    }

    setIsSubmitting(true)

    try {
      await signup({
        fullName: fullName.trim(),
        company: company.trim(),
        email: email.trim(),
        password,
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fields) {
          setFieldErrors((current) => ({ ...current, ...error.fields }))
        } else if (error.field) {
          setFieldErrors((current) => ({
            ...current,
            [error.field as keyof SignupFieldErrors]: error.message,
          }))
        } else {
          setFormError(error.message)
        }
      } else {
        setFormError('Unable to create your account. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="auth" />

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <AuthCard
          title="Create your account"
          subtitle="Start managing RFQs and quote comparisons today"
          footer={
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 no-underline hover:text-primary-700">
                Log in
              </Link>
            </>
          }
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {formError ? <FormAlert message={formError} /> : null}

            <TextField
              label="Full name"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value)
                if (fieldErrors.fullName) {
                  setFieldErrors((current) => ({ ...current, fullName: undefined }))
                }
              }}
              error={fieldErrors.fullName}
              disabled={isSubmitting}
              required
            />

            <TextField
              label="Company"
              type="text"
              name="company"
              autoComplete="organization"
              placeholder="Your organization"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value)
                if (fieldErrors.company) {
                  setFieldErrors((current) => ({ ...current, company: undefined }))
                }
              }}
              error={fieldErrors.company}
              disabled={isSubmitting}
              required
            />

            <TextField
              label="Work email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (fieldErrors.email) {
                  setFieldErrors((current) => ({ ...current, email: undefined }))
                }
              }}
              error={fieldErrors.email}
              disabled={isSubmitting}
              required
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              hint={
                fieldErrors.password
                  ? undefined
                  : 'Use at least 8 characters with a mix of letters and numbers.'
              }
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                if (fieldErrors.password) {
                  setFieldErrors((current) => ({ ...current, password: undefined }))
                }
              }}
              error={fieldErrors.password}
              disabled={isSubmitting}
              required
              minLength={8}
            />

            <div className="flex flex-col gap-1">
              <label className="inline-flex items-start gap-2 text-body text-neutral-600">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-300"
                  checked={acceptedTerms}
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked)
                    if (fieldErrors.terms) {
                      setFieldErrors((current) => ({ ...current, terms: undefined }))
                    }
                  }}
                  disabled={isSubmitting}
                  required
                />
                <span>
                  I agree to the{' '}
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-primary-600 hover:text-primary-700"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-primary-600 hover:text-primary-700"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {fieldErrors.terms ? (
                <p className="text-caption text-danger-600">{fieldErrors.terms}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </AuthCard>
      </main>

      <Footer />
    </div>
  )
}
