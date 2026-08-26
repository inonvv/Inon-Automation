import { useCallback, useEffect, useState } from 'react'
import { GitHubApiError } from '../services/github'

export type GitHubState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'error'; data: null; error: GitHubApiError }
  | { status: 'success'; data: T; error: null }

// Wraps a service fetcher in loading/error/success state with a retry handle.
// The fetcher must be referentially stable (module-level service functions are).
export function useGitHub<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<GitHubState<T>>({
    status: 'loading',
    data: null,
    error: null,
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let stale = false
    setState({ status: 'loading', data: null, error: null })
    fetcher().then(
      (data) => {
        if (!stale) setState({ status: 'success', data, error: null })
      },
      (err: unknown) => {
        if (stale) return
        const error =
          err instanceof GitHubApiError
            ? err
            : new GitHubApiError('Something went wrong loading GitHub data.', 0)
        setState({ status: 'error', data: null, error })
      },
    )
    return () => {
      stale = true
    }
  }, [fetcher, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, retry }
}
