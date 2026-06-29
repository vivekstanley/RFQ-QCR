import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { AuthCard, TextField } from '../components/AuthForm'
import { Footer } from '../components/Footer'

export function LoginPage() {
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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField
              label="Email address"
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
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-body text-neutral-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-300"
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

            <Button type="submit" variant="primary" size="large" className="w-full">
              Log in
            </Button>
          </form>
        </AuthCard>
      </main>

      <Footer />
    </div>
  )
}
