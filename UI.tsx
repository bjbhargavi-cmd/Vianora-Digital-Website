import { Link } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { track } from '../analytics'
import type { Service } from '../data'

export function Seo({ title, desc, noindex }: { title: string; desc: string; noindex?: boolean }) {
  useEffect(() => {
    document.title = title
    const set = (sel: string, attr: string, key: string, val: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
      el.content = val
    }
    set('meta[name="description"]', 'name', 'description', desc)
    set('meta[property="og:title"]', 'property', 'og:title', title)
    set('meta[property="og:description"]', 'property', 'og:description', desc)
    set('meta[property="og:type"]', 'property', 'og:type', 'website')
    set('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary')
    set('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex' : 'index,follow')
    const site = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (site) {
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
      link.href = site + window.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '')
    } else link?.remove()
  }, [title, desc, noindex])
  return null
}

type BtnProps = { children: ReactNode; to?: string; href?: string; variant?: 'gold' | 'outline'; event?: string; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>
export function Button({ children, to, href, variant = 'gold', event, className = '', ...rest }: BtnProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors disabled:opacity-60 ${
    variant === 'gold' ? 'bg-gold text-navy hover:bg-white' : 'border border-cyan/60 text-white hover:bg-cyan/15'} ${className}`
  const onClick = () => event && track(event)
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>
  if (href) return <a href={href} className={cls} onClick={onClick}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}

export function PageBanner({ title, text }: { title: string; text?: string }) {
  return (
    <section className="grid-bg border-b border-cyan/15 bg-gradient-to-b from-navy2 to-navy">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="max-w-3xl text-3xl font-extrabold md:text-5xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-ink/85">{text}</p>}
      </div>
    </section>
  )
}

export function Section({ title, children, alt }: { title?: string; children: ReactNode; alt?: boolean }) {
  return (
    <section className={alt ? 'bg-navy2/50' : ''}>
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        {title && <h2 className="mb-8 max-w-3xl text-2xl font-bold md:text-4xl">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

export function ServiceCard({ s }: { s: Service }) {
  const Icon = s.icon
  return (
    <article className="flex flex-col rounded-2xl border border-cyan/25 bg-navy2/70 p-6">
      <Icon className="h-9 w-9 text-gold" aria-hidden />
      <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
      <p className="mt-2 flex-1 text-ink/85">{s.short}</p>
      <Link to={`/services/${s.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan hover:text-white"
        onClick={() => track('service_explore_click', { service: s.slug })}>
        Explore Service<span className="sr-only"> : {s.title}</span> <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  )
}

export function TestimonialCard({ name, text, service, placeholder }: { name: string; text: string; service?: string; placeholder?: boolean }) {
  return (
    <figure className="rounded-2xl border border-dashed border-gold/50 bg-navy2/60 p-6">
      {placeholder && <p className="mb-3 inline-block rounded bg-gold/15 px-2 py-1 text-sm font-semibold text-gold">Placeholder: not a real review</p>}
      <blockquote className="text-ink/90">{text}</blockquote>
      <figcaption className="mt-4 text-sm text-ink/70">{name}{service ? `, ${service}` : ''}</figcaption>
    </figure>
  )
}

export function FAQ({ items }: { items: [string, string][] }) {
  return (
    <div className="max-w-3xl space-y-3">
      {items.map(([q, a]) => (
        <details key={q} className="group rounded-xl border border-cyan/20 bg-navy2/60 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
            {q}<ChevronDown className="h-5 w-5 shrink-0 text-cyan transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 text-ink/85">{a}</p>
        </details>
      ))}
    </div>
  )
}

export function CTA({ title = 'Ready to Grow Your Business Online?', text = 'Let’s build a digital marketing strategy aligned with your business goals.', label = 'Let’s Talk About Your Business' }: { title?: string; text?: string; label?: string }) {
  return (
    <section className="border-t border-cyan/15 bg-gradient-to-r from-electric/30 to-navy2">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center">
        <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/90">{text}</p>
        <Button to="/get-started" event="consultation_click" className="mt-8">{label}</Button>
      </div>
    </section>
  )
}

export function HeroArt() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-md" role="img" aria-label="Globe network with a rising growth arrow">
      <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#087FFF" stopOpacity=".35" /><stop offset="1" stopColor="#061A40" stopOpacity="0" /></radialGradient></defs>
      <circle cx="200" cy="200" r="190" fill="url(#g)" />
      <g fill="none" stroke="#00D4FF" strokeOpacity=".55" strokeWidth="1.5">
        <circle cx="200" cy="200" r="140" /><ellipse cx="200" cy="200" rx="60" ry="140" /><ellipse cx="200" cy="200" rx="110" ry="140" strokeOpacity=".3" />
        <path d="M60 200h280M80 135h240M80 265h240" />
      </g>
      <g fill="#00D4FF"><circle cx="110" cy="150" r="4" /><circle cx="270" cy="120" r="4" /><circle cx="300" cy="250" r="4" /><circle cx="150" cy="290" r="4" /></g>
      <path className="draw" d="M80 300 L160 230 L210 260 L320 120" fill="none" stroke="#FFC928" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 112 L325 112 L325 167" fill="none" stroke="#FFC928" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
