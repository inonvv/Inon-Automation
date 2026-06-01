import type { ReactNode } from 'react'

type Props = {
  id: string
  number: string
  title: string
  children: ReactNode
}

export default function Section({ id, number, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="flex items-center gap-4 mb-8 text-2xl font-bold text-slate-lightest"
      >
        <span className="font-mono text-accent text-base">{number}.</span>
        {title}
        <span className="ml-4 h-px flex-1 bg-navy-lightest" aria-hidden />
      </h2>
      {children}
    </section>
  )
}
