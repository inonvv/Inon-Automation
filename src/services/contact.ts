// Contact form delivery via Web3Forms + client-side anti-spam guard.
//
// Web3Forms access keys are public-by-design: the key only routes mail to the
// inbox it was created for, so embedding it in a static site is safe (it is
// not a secret token). Server-side spam protection (honeypot, filtering,
// monthly cap) is enforced by Web3Forms itself; the guard below is a
// best-effort client-side layer on top.
const ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'
const ENDPOINT = 'https://api.web3forms.com/submit'

const DAY_MS = 24 * 60 * 60 * 1000
const DEVICE_DAILY_LIMIT = 3
const MIN_INTERVAL_MS = 60 * 1000
const STORAGE_KEY = 'contact-log-v1'

export type ContactGuardVerdict = 'ok' | 'duplicate-email' | 'device-limit' | 'too-fast'

type SendRecord = { h: string; t: number }

// Fallback when localStorage is unavailable (e.g. some private modes):
// the guard still works for the lifetime of the page.
let memoryLog: SendRecord[] = []

function readLog(): SendRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (r): r is SendRecord =>
        typeof r === 'object' &&
        r !== null &&
        typeof (r as SendRecord).h === 'string' &&
        typeof (r as SendRecord).t === 'number',
    )
  } catch {
    return memoryLog
  }
}

function writeLog(records: SendRecord[]): void {
  memoryLog = records
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch {
    // storage unavailable — memoryLog already updated
  }
}

// Drop entries older than a day (the daily reset) and entries claiming to be
// from the future, so a rolled-back clock can't lock the form forever.
function prune(records: SendRecord[], now: number): SendRecord[] {
  return records.filter((r) => now - r.t < DAY_MS && r.t < now + 5 * 60 * 1000)
}

// Collapse trivial aliases so "Inon+x@Gmail.com" and "i.non@googlemail.com"
// count as the same sender: lowercase, strip +tags, and for Gmail also strip
// dots and fold googlemail.com into gmail.com.
export function normalizeEmail(raw: string): string {
  const email = raw.trim().toLowerCase()
  const at = email.lastIndexOf('@')
  if (at === -1) return email
  let local = email.slice(0, at)
  let domain = email.slice(at + 1)
  if (domain === 'googlemail.com') domain = 'gmail.com'
  const plus = local.indexOf('+')
  if (plus !== -1) local = local.slice(0, plus)
  if (domain === 'gmail.com') local = local.replaceAll('.', '')
  return `${local}@${domain}`
}

// Only a SHA-256 hash of the normalized email is persisted, never the address
// itself, so visitor emails don't sit in localStorage.
export async function hashEmail(email: string): Promise<string> {
  const data = new TextEncoder().encode(normalizeEmail(email))
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function checkGuard(emailHash: string): ContactGuardVerdict {
  const now = Date.now()
  const log = prune(readLog(), now)
  writeLog(log)
  if (log.some((r) => r.h === emailHash)) return 'duplicate-email'
  if (log.length >= DEVICE_DAILY_LIMIT) return 'device-limit'
  if (log.some((r) => now - r.t < MIN_INTERVAL_MS)) return 'too-fast'
  return 'ok'
}

export function recordSend(emailHash: string): void {
  const now = Date.now()
  writeLog([...prune(readLog(), now), { h: emailHash, t: now }])
}

export type ContactInput = { name: string; email: string; message: string }

export async function sendContactMessage({ name, email, message }: ContactInput): Promise<void> {
  if (ACCESS_KEY.startsWith('REPLACE_WITH')) {
    throw new Error('The contact form is not configured yet. Please email me directly instead.')
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Portfolio contact from ${name}`,
      name,
      email,
      message,
      botcheck: false,
    }),
  })
  const data: { success?: boolean; message?: string } | null = await res.json().catch(() => null)
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Sending failed. Please try again in a moment.')
  }
}
