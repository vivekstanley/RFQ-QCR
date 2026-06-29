type FormAlertProps = {
  message: string
}

export function FormAlert({ message }: FormAlertProps) {
  return (
    <div
      role="alert"
      className="rounded-md border border-danger-300 bg-danger-50 px-4 py-3 text-body text-danger-700"
    >
      {message}
    </div>
  )
}
