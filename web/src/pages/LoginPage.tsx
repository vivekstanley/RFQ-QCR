import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { AuthCard, TextField } from '../components/AuthForm'
import { Footer } from '../components/Footer'
import { FormAlert } from '../components/FormAlert'
import { useAuth } from '../context/AuthContext'
import { hasLoginFieldErrors, validateLoginForm, type LoginFieldErrors } from '../lib/validation'
import { ApiError } from '../types/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const errors = validateLoginForm({ email, password })
    setFieldErrors(errors)

    if (hasLoginFieldErrors(errors)) {
      return
    }

    setIsSubmitting(true)

    try {
      await login(
        {
          email: email.trim(),
          password,
        },
        { remember: rememberMe },
      )
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fields) {
          setFieldErrors((current) => ({ ...current, ...error.fields }))
        } else if (error.field) {
          setFieldErrors((current) => ({
            ...current,
            [error.field as keyof LoginFieldErrors]: error.message,
          }))
        } else {
          setFormError(error.message)
        }
      } else {
        setFormError('Unable to log in. Please try again.')
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
          title="Welcome back"
          subtitle="Log in to manage your RFQs and quote comparisons"
          footer={
            <>
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 no-underline hover:text-primary-700">
                Sign up
              </Link>
            </>
          }
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {formError ? <FormAlert message={formError} /> : null}

            <TextField
              label="Email address"
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
              autoComplete="current-password"
              placeholder="Enter your password"
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
            />

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-body text-neutral-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-300"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  disabled={isSubmitting}
                />
                Remember me
              </label>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-body text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </Button>
          </form>
        </AuthCard>
      </main>

      <Footer />
    </div>
  )
}
