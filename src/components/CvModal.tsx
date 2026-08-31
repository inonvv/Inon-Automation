import { useEffect, useRef } from 'react'

type Props = { open: boolean; onClose: () => void }

const SKILLS: [string, string][] = [
  ['Languages', 'JavaScript / TypeScript, Python, C#'],
  [
    'Testing & automation',
    'Playwright, Cypress, Selenium, automated test-suite design, SDLC best practices',
  ],
  ['Frameworks & runtime', 'Node.js, React Native'],
  ['DevOps & CI/CD', 'GitHub Actions, Docker, Git'],
  ['API & data', 'REST, Postman, SQL, MongoDB'],
  ['Tooling', 'JIRA, TestRail; AI-assisted development (Claude Code, GitHub Copilot)'],
]

const EXPERIENCE = [
  {
    role: 'Automation Engineer',
    org: 'Bylith',
    period: '2026 – Present',
    bullets: [
      'Develop and maintain end-to-end Playwright test suites across QA and staging environments.',
      'Build scalable automation frameworks integrated with CI/CD pipelines, reducing manual-testing overhead and raising coverage standards.',
      'Triage failures across UI, API, data and CI layers to isolate root cause; communicate test results and quality risks clearly to developers and management.',
    ],
  },
  {
    role: 'Junior Full-Stack Automation Engineer',
    org: 'Bylith',
    period: '2025 – 2026',
    bullets: [
      'Developed and maintained full-stack automation solutions using modern JavaScript frameworks.',
      'Built automated test pipelines, integrated CI/CD workflows, and contributed to feature development across front-end and back-end systems.',
    ],
  },
  {
    role: 'Freelance Programmer',
    org: 'Minus-One Pub',
    period: '2023 – 2024',
    bullets: [
      'Designed, developed, tested, and deployed full-stack web applications for restaurant management for a non-technical client — requirements through production support, solo.',
      'Built RESTful APIs and web services using React Native and Node.js.',
    ],
  },
  {
    role: 'Teaching Assistant',
    org: 'Ruppin Technological College',
    period: '2023 – 2024',
    bullets: [
      'Tutored computer-science students in Data Structures, Algorithms, and JavaScript.',
      'Analyzed and debugged student code in .NET and Java; provided detailed technical feedback.',
    ],
  },
  {
    role: 'Commander, Combat Engineering',
    org: 'IDF',
    period: '2016 – 2019',
    bullets: [
      'Served as combat soldier and unit commander with full responsibility for personnel and equipment.',
      'Strong task prioritization, time management, and team leadership under high-pressure conditions.',
    ],
  },
]

function CvHeading({ children }: { children: string }) {
  return (
    <h4 className="mb-3 border-b border-navy-lightest pb-1 font-mono text-xs uppercase tracking-widest text-accent">
      {children}
    </h4>
  )
}

export default function CvModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      aria-labelledby="cv-modal-heading"
      className="m-auto max-h-[85vh] w-[calc(100vw-2rem)] max-w-3xl rounded-lg border border-navy-lightest bg-navy-light p-0 text-slate-light backdrop:bg-black/60"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-navy-lightest bg-navy-light p-6 pb-4">
        <div>
          <h3 id="cv-modal-heading" className="text-2xl font-bold text-slate-lightest">
            Inon Vinogradsky
          </h3>
          <p className="mt-1 font-mono text-sm text-slate">
            QA Automation & Full-Stack Engineer · Netanya, Israel ·{' '}
            <a
              href="https://linkedin.com/in/inon-vinogradsky"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="font-mono text-slate hover:text-accent"
        >
          ✕
        </button>
      </div>

      <div className="space-y-8 p-6 pt-5">
        <section aria-label="Profile summary">
          <CvHeading>Profile</CvHeading>
          <p>
            QA Automation and full-stack engineer (3 yrs). Builds end-to-end Playwright test suites
            and scalable automation frameworks integrated with CI/CD; develops across front-end and
            back-end (TypeScript, Node.js, React Native, Python). Background in teaching and
            military leadership — communicates clearly and works well under pressure. Reach me via
            the contact section below.
          </p>
        </section>

        <section aria-label="Skills">
          <CvHeading>Skills</CvHeading>
          <dl className="space-y-2">
            {SKILLS.map(([category, items]) => (
              <div key={category} className="sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="font-mono text-sm text-slate-lightest">{category}</dt>
                <dd className="text-sm">{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Work experience">
          <CvHeading>Work experience</CvHeading>
          <ol className="space-y-6">
            {EXPERIENCE.map((job) => (
              <li key={`${job.role}-${job.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h5 className="font-bold text-slate-lightest">
                    {job.role} <span className="text-accent">@ {job.org}</span>
                  </h5>
                  <span className="font-mono text-xs text-slate">{job.period}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="Personal projects">
          <CvHeading>Personal projects</CvHeading>
          <p className="text-sm">
            <span className="font-bold text-slate-lightest">Autonomous job-search agent</span>{' '}
            <span className="font-mono text-xs text-slate">(2026, ongoing)</span> — designed and
            built with Claude Code: Playwright scraping across six job boards, rule-based filtering
            and scoring, automated multi-step form filling with a safety-review layer,
            Gmail-integrated application tracking, and a vanilla-JS dashboard.
          </p>
        </section>

        <section aria-label="Education and languages">
          <CvHeading>Education & languages</CvHeading>
          <p className="text-sm">
            <span className="font-bold text-slate-lightest">Ruppin Technological College</span>{' '}
            <span className="font-mono text-xs text-slate">2022 – 2024</span> — Practical Software
            Development, graduated with distinction.
          </p>
          <p className="mt-2 text-sm">Hebrew: native · English: fluent · German: basic</p>
        </section>

        <a
          href={`${import.meta.env.BASE_URL}cv.pdf`}
          download="Inon_Vinogradsky_CV.pdf"
          className="inline-block rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
        >
          Download PDF
        </a>
      </div>
    </dialog>
  )
}
