import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 text-neutral-700 no-underline ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-600 text-subtitle font-medium text-white">
        RQ
      </span>
      <span className="text-title font-medium tracking-tight">RFQ-QCR</span>
    </Link>
  )
}
