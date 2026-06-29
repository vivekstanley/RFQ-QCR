import { useNavigate } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="auth" />

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg rounded-md border border-neutral-200 bg-white p-8 shadow-card">
          <p className="text-caption font-medium uppercase tracking-wider text-primary-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-h2 font-medium text-neutral-700">
            Welcome back, {user?.fullName}
          </h1>
          <p className="mt-3 text-body text-neutral-500">
            You are signed in to RFQ-QCR. Connect your LLM account and start managing RFQs.
          </p>

          <dl className="mt-6 space-y-3 rounded-md bg-neutral-50 p-4 text-body">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Email</dt>
              <dd className="font-medium text-neutral-700">{user?.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Company</dt>
              <dd className="font-medium text-neutral-700">{user?.company}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="medium" disabled>
              Go to dashboard (coming soon)
            </Button>
            <Button variant="outline" size="medium" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
