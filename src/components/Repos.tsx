import Section from './Section'
import DataState from './DataState'
import RepoCard from './RepoCard'
import { useGitHub } from '../hooks/useGitHub'
import { getRepos } from '../services/github'

// Curated by owner; order is display order.
const FEATURED = ['formulaSim', 'GIFgenerator', 'automate-ebay', 'CC-project']

export default function Repos() {
  const { status, data: repos, error, retry } = useGitHub(getRepos)

  const top = FEATURED.map((name) => (repos ?? []).find((r) => r.name === name)).filter(
    (r) => r !== undefined,
  )

  return (
    <Section id="repos" number="02" title="Repositories">
      <DataState status={status} error={error} retry={retry} label="repositories">
        {top.length === 0 ? (
          <p className="font-mono text-sm text-slate">No public repositories to show yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {top.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </DataState>
    </Section>
  )
}
