import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { checkGuard, hashEmail, recordSend, sendContactMessage } from '../services/contact'

type Props = { open: boolean; onClose: () => void }

// 'sent' | 'duplicate' | 'limit' replace the form with a message panel;
// 'idle' | 'sending' | 'error' keep the form visible.
type Status = 'idle' | 'sending' | 'sent' | 'duplicate' | 'limit' | 'error'

// Submits faster than this after opening are treated as bots.
const MIN_FILL_MS = 3000

const inputClass =
  'w-full rounded border border-navy-lightest bg-navy px-3 py-2 text-slate-lightest placeholder:text-slate/60'

export default function ContactModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openedAtRef = useRef(0)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      openedAtRef.current = Date.now()
      dialog.showModal()
      // React strips the autofocus attribute, so showModal() would land on
      // the close button; move focus to the first field explicitly.
      dialog.querySelector<HTMLInputElement>('#contact-name')?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Reset on close (not open) so the reopened modal renders the form
  // immediately instead of flashing the previous status panel.
  function handleClose() {
    setStatus('idle')
    setErrorMsg('')
    onClose()
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    // Honeypot checked or humanly-impossible fill time: pretend success so
    // bots get no signal, but send nothing.
    if (data.get('botcheck') || Date.now() - openedAtRef.current < MIN_FILL_MS) {
      setStatus('sent')
      return
    }

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMsg('Please fill in all fields (spaces alone don’t count).')
      return
    }

    const emailHash = await hashEmail(email)
    const verdict = checkGuard(emailHash)
    if (verdict === 'duplicate-email') {
      setStatus('duplicate')
      return
    }
    if (verdict === 'device-limit') {
      setStatus('limit')
      return
    }
    if (verdict === 'too-fast') {
      setStatus('error')
      setErrorMsg('Please wait a minute before sending another message.')
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      await sendContactMessage({ name, email, message })
      recordSend(emailHash)
      form.reset()
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Sending failed. Please try again in a moment.')
    }
  }

  const panelText =
    status === 'sent'
      ? 'Thanks! Your message is on its way — I’ll get back to you soon.'
      : status === 'duplicate'
        ? 'You have already sent a message — thank you very much! To keep spam away, the form unlocks again a day after your last message.'
        : 'This device has reached today’s message limit. Please try again tomorrow.'

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose()
      }}
      aria-labelledby="contact-modal-heading"
      className="m-auto w-[calc(100vw-2rem)] max-w-md rounded-lg border border-navy-lightest bg-navy-light p-0 text-slate-light backdrop:bg-black/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 id="contact-modal-heading" className="text-xl font-bold text-slate-lightest">
            Send me a message
          </h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="font-mono text-slate hover:text-accent"
          >
            ✕
          </button>
        </div>

        {status === 'sent' || status === 'duplicate' || status === 'limit' ? (
          <div className="mt-6 space-y-6">
            <p role="status" className="text-slate-light">
              {panelText}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate={false}>
            {/* Honeypot — hidden from real users, tempting for bots. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <label htmlFor="contact-name" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={2000}
                rows={5}
                className={`${inputClass} resize-y`}
              />
            </div>
            {status === 'error' && (
              <p role="alert" className="font-mono text-sm text-red-400">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </form>
        )}
      </div>
    </dialog>
  )
}
