import type { GitHubRepo } from '../types/github'

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <li className="group relative flex flex-col rounded bg-navy-light p-6 transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-9 w-9 stroke-accent"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-slate transition-colors group-hover:stroke-accent"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-lightest transition-colors group-hover:text-accent">
        <a href={repo.html_url} className="focus-visible:outline-offset-4">
          {/* stretched link makes the whole card clickable without nesting interactives */}
          <span className="absolute inset-0" aria-hidden />
          {repo.name}
        </a>
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-light">
        {repo.description ?? 'No description yet.'}
      </p>
      <p className="mt-5 flex items-center gap-4 font-mono text-xs text-slate">
        {repo.language && <span>{repo.language}</span>}
        <span aria-label={`${repo.stargazers_count} stars`}>★ {repo.stargazers_count}</span>
        <time dateTime={repo.updated_at}>
          {new Date(repo.updated_at).toLocaleDateString([], {
            month: 'short',
            year: 'numeric',
          })}
        </time>
      </p>
    </li>
  )
}
