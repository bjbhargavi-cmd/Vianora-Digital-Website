import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { services, industryOptions, goals } from '../data'
import { Button } from './UI'
import { track } from '../analytics'

const ENQUIRY_URL = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
const REVIEW_URL = ((import.meta.env.VITE_REVIEW_ENDPOINT as string | undefined) || ENQUIRY_URL)
type Errors = Record<string, string>

async function send(url: string | undefined, payload: Record<string, FormDataEntryValue | string>) {
  if (!url) throw new Error('NOT_CONFIGURED')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('FAILED')
}
const errorMessage = (e: unknown) => (e instanceof Error && e.message === 'NOT_CONFIGURED'
  ? 'This form is not connected to a form service yet, so your message was not sent. Please call or email us instead.'
  : 'Your message could not be sent. Please check your connection and try again, or contact us by phone or email.')

const input = 'w-full rounded-lg border border-cyan/30 bg-navy px-3 py-2.5 text-white placeholder:text-ink/50 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/40'

interface FieldProps { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'; options?: string[]; required?: boolean; error?: string; defaultValue?: string }
function Field({ name, label, type = 'text', options, required, error, defaultValue }: FieldProps) {
  const common = { id: name, name, 'aria-invalid': !!error, 'aria-describedby': error ? `${name}-err` : undefined, className: input, defaultValue }
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-white">{label}{required ? ' *' : ''}</label>
      {type === 'select' ? (
        <select {...common}><option value="">Select…</option>{options?.map(o => <option key={o}>{o}</option>)}</select>
      ) : type === 'textarea' ? <textarea {...common} rows={4} /> : <input {...common} type={type} autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined} />}
      {error && <p id={`${name}-err`} role="alert" className="mt-1 flex items-center gap-1 text-sm text-gold"><AlertCircle className="h-4 w-4" aria-hidden />{error}</p>}
    </div>
  )
}
function Consent({ error, text }: { error?: string; text: string }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-cyan" aria-invalid={!!error} />
        <span>{text} <Link to="/privacy-policy" target="_blank" className="underline hover:text-cyan">Privacy Policy</Link></span></label>
      {error && <p role="alert" className="mt-1 flex items-center gap-1 text-sm text-gold"><AlertCircle className="h-4 w-4" aria-hidden />{error}</p>}
    </div>
  )
}
const Honeypot = () => <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const digits = (v: string) => v.replace(/\D/g, '')

export function EnquiryForm({ mode, service = '' }: { mode: 'contact' | 'lead'; service?: string }) {
  const nav = useNavigate()
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')
  const serviceNames = services.map(s => s.title)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return // honeypot filled: bot
    const v = (k: string) => String(fd.get(k) || '').trim()
    const er: Errors = {}
    if (!v('name')) er.name = 'Enter your full name.'
    if (!v('email')) er.email = 'Enter your email address.'; else if (!EMAIL.test(v('email'))) er.email = 'Enter a valid email address, for example name@company.com.'
    if (!v('phone')) er.phone = 'Enter your phone number.'; else if (digits(v('phone')).length < 10 || digits(v('phone')).length > 15) er.phone = 'Enter a phone number with 10 to 15 digits.'
    if (!v('industry')) er.industry = 'Select your industry.'
    if (!v('service')) er.service = 'Select a service.'
    if (mode === 'lead' && !v('goal')) er.goal = 'Select your main marketing goal.'
    if (mode === 'contact' && !v('message')) er.message = 'Tell us a little about your requirements.'
    if (!fd.get('consent')) er.consent = 'Please agree to the privacy policy to continue.'
    setErrors(er); setFail('')
    if (Object.keys(er).length) return
    setBusy(true)
    try {
      const payload: Record<string, string> = { form: mode }
      fd.forEach((val, k) => { if (k !== 'website') payload[k] = String(val) })
      await send(ENQUIRY_URL, payload)
      track('lead_form_success', { form: mode })
      nav('/thank-you', { state: { submitted: true } })
    } catch (err) { setFail(errorMessage(err)); setBusy(false) }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4 rounded-2xl border border-cyan/25 bg-navy2/70 p-6 md:p-8" aria-busy={busy}>
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" required error={errors.name} />
        <Field name="business" label="Business name" />
        <Field name="email" label="Email address" type="email" required error={errors.email} />
        <Field name="phone" label="Phone number" type="tel" required error={errors.phone} />
        <Field name="industry" label="Industry" type="select" options={industryOptions} required error={errors.industry} />
        {mode === 'lead' && <Field name="goal" label="Primary marketing goal" type="select" options={goals} required error={errors.goal} />}
        <Field name="service" label={mode === 'lead' ? 'Service required' : 'Service of interest'} type="select" options={serviceNames} required error={errors.service} defaultValue={serviceNames.find(s => s === service) || ''} />
        <Field name="budget" label="Monthly marketing budget (optional)" />
      </div>
      <Field name="message" type="textarea" label={mode === 'lead' ? 'Additional information' : 'Tell us about your requirements'} required={mode === 'contact'} error={errors.message} />
      <Consent error={errors.consent} text="I agree that Vianora may use these details to respond to my enquiry." />
      {fail && <p role="alert" className="flex gap-2 rounded-lg border border-gold/60 bg-gold/10 p-3 text-sm text-gold"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{fail}</p>}
      <Button type="submit" disabled={busy}>{busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Sending…</> : mode === 'lead' ? 'Submit My Enquiry' : 'Send Message'}</Button>
    </form>
  )
}

export function ReviewForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')
  const [done, setDone] = useState(false)
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) return
    const v = (k: string) => String(fd.get(k) || '').trim()
    const er: Errors = {}
    if (!v('name')) er.name = 'Enter your name.'
    if (v('email') && !EMAIL.test(v('email'))) er.email = 'Enter a valid email address.'
    if (!v('rating')) er.rating = 'Select a rating.'
    if (v('feedback').length < 10) er.feedback = 'Write at least 10 characters of feedback.'
    if (!fd.get('consent')) er.consent = 'Please confirm you agree to the review being published.'
    setErrors(er); setFail('')
    if (Object.keys(er).length) return
    setBusy(true)
    try {
      const payload: Record<string, string> = { form: 'review', status: 'pending-moderation' }
      fd.forEach((val, k) => { if (k !== 'website') payload[k] = String(val) })
      await send(REVIEW_URL, payload)
      setDone(true); form.reset()
    } catch (err) { setFail(errorMessage(err)) }
    setBusy(false)
  }
  if (done) return (
    <div role="status" className="rounded-2xl border border-cyan/40 bg-navy2/70 p-8 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-gold" aria-hidden />
      <p className="mt-3 text-lg font-semibold text-white">Thank you for your feedback.</p>
      <p className="mt-1 text-ink/85">Your review has been sent for moderation. It will not appear on the site until it has been approved.</p>
    </div>
  )
  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4 rounded-2xl border border-cyan/25 bg-navy2/70 p-6 md:p-8">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name} />
        <Field name="business" label="Business name (optional)" />
        <Field name="email" label="Email (optional, not published)" type="email" error={errors.email} />
        <Field name="service" label="Service received (optional)" type="select" options={services.map(s => s.title)} />
        <Field name="rating" label="Rating" type="select" options={['5', '4', '3', '2', '1']} required error={errors.rating} />
      </div>
      <Field name="feedback" type="textarea" label="Your feedback" required error={errors.feedback} />
      <Consent error={errors.consent} text="I agree that my review may be published on the Vianora website after approval." />
      {fail && <p role="alert" className="flex gap-2 rounded-lg border border-gold/60 bg-gold/10 p-3 text-sm text-gold"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{fail}</p>}
      <Button type="submit" disabled={busy}>{busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Sending…</> : 'Submit Review'}</Button>
    </form>
  )
}
