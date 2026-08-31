import { useState } from 'react'
import Section from './Section'
import ContactModal from './ContactModal'

export default function Contact() {
  const [open, setOpen] = useState(false)

  return (
    <Section id="contact" number="05" title="Contact">
      <div className="max-w-xl space-y-6">
        <p className="text-slate-light">
          Whether you have a question, an opportunity, or just want to say hi — my inbox is open.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
        >
          Say hello
        </button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </Section>
  )
}
