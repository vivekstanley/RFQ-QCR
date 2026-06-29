import type { InputHTMLAttributes, ReactNode } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export function TextField({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={fieldId} className="text-body font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={fieldId}
        className={`h-10 rounded-md border bg-white px-3 text-body text-neutral-700 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
          error ? 'border-danger-500' : 'border-neutral-300'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-caption text-danger-600">{error}</p>
      ) : hint ? (
        <p className="text-caption text-neutral-500">{hint}</p>
      ) : null}
    </div>
  )
}

type AuthCardProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-md border border-neutral-200 bg-white p-8 shadow-card">
      <div className="mb-8 text-center">
        <h1 className="text-h2 font-medium text-neutral-700">{title}</h1>
        <p className="mt-2 text-body text-neutral-500">{subtitle}</p>
      </div>
      {children}
      <div className="mt-6 text-center text-body text-neutral-600">{footer}</div>
    </div>
  )
}
