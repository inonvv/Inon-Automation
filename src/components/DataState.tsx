import type { ReactNode } from 'react'
import type { GitHubApiError } from '../services/github'

type Props = {
  status: 'loading' | 'error' | 'success'
  error: GitHubApiError | null
  retry: () => void
  label: string
  children: ReactNode
}

// Renders loading skeleton / error-with-retry for a data section; children on success.
export default function DataState({ status, error, retry, label, children }: Props) {
  if (status === 'loading') {
    return (
      <div role="status" className="space-y-3">
        <span className="sr-only">Loading {label}…</span>
        <div aria-hidden className="h-4 w-3/4 animate-pulse rounded bg-navy-lightest" />
        <div aria-hidden className="h-4 w-1/2 animate-pulse rounded bg-navy-lightest" />
        <div aria-hidden className="h-4 w-2/3 animate-pulse rounded bg-navy-lightest" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert" className="space-y-4 font-mono text-sm text-slate-light">
        <p>{error?.message ?? `Couldn't load ${label}.`}</p>
        <button
          type="button"
          onClick={retry}
          className="rounded border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent/10"
        >
          Retry
        </button>
      </div>
    )
  }

  return <>{children}</>
}
