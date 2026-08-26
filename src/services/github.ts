// GitHub API service layer: typed fetchers with rate-limit/error handling
// and per-endpoint promise memoization so multiple components share one request.

import type { GitHubUser, GitHubRepo, GitHubEvent } from '../types/github'

export const GITHUB_USERNAME = 'inonvv'
export const GITHUB_API_BASE = 'https://api.github.com'

export class GitHubApiError extends Error {
  status: number
  rateLimited: boolean
  resetAt: Date | null

  constructor(message: string, status: number, rateLimited = false, resetAt: Date | null = null) {
    super(message)
    this.name = 'GitHubApiError'
    this.status = status
    this.rateLimited = rateLimited
    this.resetAt = resetAt
  }
}

async function fetchJson<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
  } catch {
    throw new GitHubApiError('Network error — check your connection and try again.', 0)
  }

  if (!res.ok) {
    const rateLimited =
      (res.status === 403 || res.status === 429) &&
      res.headers.get('x-ratelimit-remaining') === '0'
    if (rateLimited) {
      const reset = res.headers.get('x-ratelimit-reset')
      const resetAt = reset ? new Date(Number(reset) * 1000) : null
      const when = resetAt
        ? ` Try again after ${resetAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
        : ' Try again in a bit.'
      throw new GitHubApiError(`GitHub API rate limit reached.${when}`, res.status, true, resetAt)
    }
    if (res.status === 404) {
      throw new GitHubApiError('GitHub returned 404 — resource not found.', 404)
    }
    throw new GitHubApiError(`GitHub API error (HTTP ${res.status}).`, res.status)
  }

  return res.json() as Promise<T>
}

// Memoize in-flight/settled promises per path; drop failures so retry refetches.
const cache = new Map<string, Promise<unknown>>()

function cached<T>(path: string): Promise<T> {
  let promise = cache.get(path) as Promise<T> | undefined
  if (!promise) {
    promise = fetchJson<T>(path).catch((err) => {
      cache.delete(path)
      throw err
    })
    cache.set(path, promise)
  }
  return promise
}

export const getUser = () => cached<GitHubUser>(`/users/${GITHUB_USERNAME}`)

export const getRepos = () =>
  cached<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)

export const getEvents = () =>
  cached<GitHubEvent[]>(`/users/${GITHUB_USERNAME}/events/public?per_page=30`)
