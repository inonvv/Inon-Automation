import { useState } from 'react'
import Section from './Section'
import CvModal from './CvModal'

export default function Resume() {
  const [open, setOpen] = useState(false)

  return (
    <Section id="resume" number="04" title="Résumé">
      <div className="max-w-xl space-y-6">
        <p className="text-slate-light">
          The full picture — experience, skills, and education — as a readable page, with a PDF if
          you need one for your pipeline.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
        >
          View CV
        </button>
      </div>
      <CvModal open={open} onClose={() => setOpen(false)} />
    </Section>
  )
}
