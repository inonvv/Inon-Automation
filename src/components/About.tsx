import Section from './Section'
import DataState from './DataState'
import { useGitHub } from '../hooks/useGitHub'
import { getUser } from '../services/github'

export default function About() {
  const { status, data: user, error, retry } = useGitHub(getUser)

  return (
    <Section id="about" number="01" title="About">
      <DataState status={status} error={error} retry={retry} label="profile">
        {user && (
          <div className="grid items-start gap-12 md:grid-cols-[1fr_240px]">
            <div className="max-w-2xl space-y-6 text-slate-light">
              <p>{user.bio ?? 'This profile has no bio yet — the code speaks for itself.'}</p>
              <dl className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
                <div>
                  <dt className="text-slate">Followers</dt>
                  <dd className="mt-1 text-2xl text-accent">{user.followers}</dd>
                </div>
                <div>
                  <dt className="text-slate">Following</dt>
                  <dd className="mt-1 text-2xl text-accent">{user.following}</dd>
                </div>
                <div>
                  <dt className="text-slate">Public repos</dt>
                  <dd className="mt-1 text-2xl text-accent">{user.public_repos}</dd>
                </div>
              </dl>
            </div>
            <div className="group relative max-w-60">
              <img
                src={user.avatar_url}
                alt={`GitHub avatar of ${user.name ?? user.login}`}
                width={240}
                height={240}
                className="relative z-10 aspect-square rounded object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 z-0 translate-x-4 translate-y-4 rounded border-2 border-accent transition-transform group-hover:translate-x-3 group-hover:translate-y-3"
              />
            </div>
          </div>
        )}
      </DataState>
    </Section>
  )
}
