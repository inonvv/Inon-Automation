type Section = { id: string; label: string }

type Props = { sections: Section[] }

export default function Sidebar({ sections }: Props) {
  return (
    <aside
      aria-label="Section navigation"
      className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between py-12 lg:py-24"
    >
      <div>
        <h1 className="text-4xl font-bold text-slate-lightest tracking-tight">Inon Vinogradsky</h1>
        <p className="mt-2 text-lg text-slate-light">Builder of useful automations.</p>
        <p className="mt-4 max-w-xs text-sm text-slate">
          Live portfolio sourced from github.com/inonvv.
        </p>
        <nav className="mt-12 hidden lg:block" aria-label="Primary">
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-slate hover:text-slate-lightest transition-colors"
                >
                  <span className="h-px w-8 bg-slate group-hover:w-16 group-hover:bg-slate-lightest transition-all" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ul className="mt-12 lg:mt-0 flex gap-5 font-mono text-sm text-slate">
        <li>
          <a href="https://github.com/inonvv" className="hover:text-accent" aria-label="GitHub">
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/inon-vinogradsky"
            className="hover:text-accent"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </aside>
  )
}
