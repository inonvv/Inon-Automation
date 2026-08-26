import Section from './Section'
import DataState from './DataState'
import RepoCard from './RepoCard'
import { useGitHub } from '../hooks/useGitHub'
import { getRepos } from '../services/github'

const MAX_REPOS = 6

export default function Repos() {
  const { status, data: repos, error, retry } = useGitHub(getRepos)

  const top = (repos ?? [])
    .filter((r) => !r.fork && !r.archived)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.updated_at) - Date.parse(a.updated_at),
    )
    .slice(0, MAX_REPOS)

  return (
    <Section id="repos" number="02" title="Repositories">
      <DataState status={status} error={error} retry={retry} label="repositories">
        {top.length === 0 ? (
          <p className="font-mono text-sm text-slate">No public repositories to show yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {top.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </DataState>
    </Section>
  )
}
