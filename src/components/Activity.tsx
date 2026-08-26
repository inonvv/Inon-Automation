import Section from './Section'
import DataState from './DataState'
import { useGitHub } from '../hooks/useGitHub'
import { getEvents } from '../services/github'
import type { GitHubEvent } from '../types/github'

const MAX_EVENTS = 8

function describe(event: GitHubEvent): string {
  const { type, payload } = event
  switch (type) {
    case 'PushEvent': {
      const n = payload?.commits?.length ?? 0
      return n > 0 ? `Pushed ${n} ${n === 1 ? 'commit' : 'commits'} to` : 'Pushed to'
    }
    case 'CreateEvent':
      return payload?.ref_type === 'repository'
        ? 'Created repository'
        : `Created ${payload?.ref_type ?? 'ref'} ${payload?.ref ?? ''} in`.replace('  ', ' ')
    case 'WatchEvent':
      return 'Starred'
    case 'ForkEvent':
      return 'Forked'
    case 'IssuesEvent':
      return `${capitalize(payload?.action)} an issue in`
    case 'PullRequestEvent':
      return `${capitalize(payload?.action)} a pull request in`
    case 'ReleaseEvent':
      return 'Published a release in'
    case 'PublicEvent':
      return 'Open-sourced'
    default:
      // e.g. "MemberEvent" -> "Member event in"
      return `${type.replace(/Event$/, '').replace(/([a-z])([A-Z])/g, '$1 $2')} event in`
  }
}

function capitalize(word?: string): string {
  return word ? word[0].toUpperCase() + word.slice(1) : 'Updated'
}

function relativeTime(iso: string): string {
  const seconds = Math.round((Date.parse(iso) - Date.now()) / 1000)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

export default function Activity() {
  const { status, data: events, error, retry } = useGitHub(getEvents)
  const recent = (events ?? []).slice(0, MAX_EVENTS)

  return (
    <Section id="activity" number="04" title="Recent activity">
      <DataState status={status} error={error} retry={retry} label="recent activity">
        {recent.length === 0 ? (
          <p className="font-mono text-sm text-slate">No public activity in the last 90 days.</p>
        ) : (
          <ol className="max-w-2xl space-y-1">
            {recent.map((event) => (
              <li
                key={event.id}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded px-3 py-2.5 transition-colors hover:bg-navy-light"
              >
                <span aria-hidden className="font-mono text-accent">
                  ▹
                </span>
                <span className="text-slate-light">
                  {describe(event)}{' '}
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    className="font-medium text-slate-lightest transition-colors hover:text-accent"
                  >
                    {event.repo.name}
                  </a>
                </span>
                <time
                  dateTime={event.created_at}
                  className="ml-auto shrink-0 font-mono text-xs text-slate"
                >
                  {relativeTime(event.created_at)}
                </time>
              </li>
            ))}
          </ol>
        )}
      </DataState>
    </Section>
  )
}
