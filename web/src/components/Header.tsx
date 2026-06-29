import { Link } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Logo } from './Logo'

type HeaderProps = {
  variant?: 'landing' | 'auth'
}

export function Header({ variant = 'landing' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        {variant === 'landing' ? (
          <nav className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="medium">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="medium">
                Sign up
              </Button>
            </Link>
          </nav>
        ) : (
          <Link
            to="/"
            className="text-body text-neutral-600 no-underline transition-colors hover:text-primary-600"
          >
            Back to home
          </Link>
        )}
      </div>
    </header>
  )
}
