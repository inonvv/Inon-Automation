import Section from './Section'
import DataState from './DataState'
import { useGitHub } from '../hooks/useGitHub'
import { getRepos } from '../services/github'

// GitHub linguist colors for languages likely in this account; accent as fallback.
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  'C#': '#178600',
  'C++': '#f34b7d',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
}

export default function Languages() {
  const { status, data: repos, error, retry } = useGitHub(getRepos)

  const counts = new Map<string, number>()
  for (const repo of repos ?? []) {
    if (repo.fork || repo.archived || !repo.language) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  const breakdown = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({
      language,
      count,
      percent: Math.round((count / total) * 100),
      color: LANGUAGE_COLORS[language] ?? 'var(--color-accent)',
    }))

  return (
    <Section id="languages" number="03" title="Languages">
      <DataState status={status} error={error} retry={retry} label="language breakdown">
        {breakdown.length === 0 ? (
          <p className="font-mono text-sm text-slate">No language data available yet.</p>
        ) : (
          <div className="max-w-2xl space-y-6">
            <p className="text-sm text-slate">
              Share of primary language across {total} original public{' '}
              {total === 1 ? 'repository' : 'repositories'}.
            </p>
            <div aria-hidden className="flex h-3 overflow-hidden rounded-full bg-navy-light">
              {breakdown.map(({ language, percent, color }) => (
                <div key={language} style={{ width: `${percent}%`, backgroundColor: color }} />
              ))}
            </div>
            <ul className="grid gap-x-10 gap-y-3 font-mono text-sm sm:grid-cols-2">
              {breakdown.map(({ language, count, percent, color }) => (
                <li key={language} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-slate-lightest">{language}</span>
                  <span className="ml-auto text-slate">
                    {percent}% · {count} {count === 1 ? 'repo' : 'repos'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DataState>
    </Section>
  )
}
