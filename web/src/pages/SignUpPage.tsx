import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { AuthCard, TextField } from '../components/AuthForm'
import { Footer } from '../components/Footer'

export function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField
              label="Full name"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />

            <TextField
              label="Company"
              type="text"
              name="company"
              autoComplete="organization"
              placeholder="Your organization"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />

            <TextField
              label="Work email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              hint="Use at least 8 characters with a mix of letters and numbers."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />

            <label className="inline-flex items-start gap-2 text-body text-neutral-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-300"
                required
              />
              <span>
                I agree to the{' '}
                <button type="button" className="border-0 bg-transparent p-0 text-primary-600 hover:text-primary-700">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="border-0 bg-transparent p-0 text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </button>
              </span>
            </label>

            <Button type="submit" variant="primary" size="large" className="w-full">
              Create account
            </Button>
          </form>
        </AuthCard>
      </main>

      <Footer />
    </div>
  )
}
