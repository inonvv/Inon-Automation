import Section from './Section'

export default function About() {
  return (
    <Section id="about" number="01" title="About">
      <div className="grid md:grid-cols-[1fr_240px] gap-12 items-start text-slate-light">
        <div className="space-y-4 max-w-2xl">
          <p>
            Profile data (avatar, bio, followers) will load here from the GitHub REST API in the
            next phase.
          </p>
          <p className="text-slate text-sm font-mono">phase 2 — service layer pending</p>
        </div>
        <div
          className="aspect-square rounded bg-navy-light border border-navy-lightest"
          aria-hidden
        />
      </div>
    </Section>
  )
}
