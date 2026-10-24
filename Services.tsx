import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { services, process } from '../data'
import { Button, CTA, FAQ, PageBanner, Section, Seo, ServiceCard } from '../components/UI'
import { EnquiryForm } from '../components/Forms'
import NotFound from './NotFound'
import { useEffect } from 'react'
import { track } from '../analytics'

export function Services() {
  return (
    <>
      <Seo title="Digital Marketing Services | Vianora" desc="Google Ads, Meta Ads, SEO, lead generation, automation, video and strategy services from Vianora." />
      <PageBanner title="Digital Marketing Services That Support Real Business Goals" text="Eight services, one connected approach. Choose what you need or let us recommend a starting point." />
      <Section>
        <div className="space-y-6">
          {services.map(s => { const Icon = s.icon; return (
            <article key={s.slug} className="grid gap-6 rounded-2xl border border-cyan/25 bg-navy2/60 p-6 md:grid-cols-[1fr_2fr]">
              <div><Icon className="h-9 w-9 text-gold" aria-hidden /><h2 className="mt-3 text-xl font-bold">{s.title}</h2></div>
              <div className="space-y-3 text-ink/90">
                <p><strong className="text-white">What it is:</strong> {s.what}</p>
                <p><strong className="text-white">Why you may need it:</strong> {s.why}</p>
                <p><strong className="text-white">How Vianora can help:</strong> {s.help.join(', ')}.</p>
                <p><strong className="text-white">Benefits:</strong> {s.benefit}</p>
                <div className="flex flex-wrap gap-3 pt-2"><Button to={`/services/${s.slug}`}>Explore this service</Button><Button to="/get-started" variant="outline" event="consultation_click">Get a Free Consultation</Button></div>
              </div>
            </article>) })}
        </div>
      </Section>
      <CTA />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const i = services.findIndex(s => s.slug === slug)
  useEffect(() => { if (slug) track('service_view', { service: slug }) }, [slug])
  if (i < 0) return <NotFound />
  const s = services[i]
  const related = [services[(i + 1) % 8], services[(i + 2) % 8]]
  return (
    <>
      <Seo title={`${s.title} | Vianora`} desc={`${s.what.split('. ')[0]}. Request a free consultation with Vianora.`} />
      <PageBanner title={s.hero} text={s.short} />
      <Section title={`About ${s.title}`}>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-ink/90"><p>{s.what}</p><p>{s.why}</p></div>
          <div><h3 className="mb-3 text-lg font-bold">Common challenges</h3><ul className="space-y-2">{s.challenges.map(c => <li key={c} className="rounded-lg border border-cyan/20 p-3">{c}</li>)}</ul></div>
        </div>
      </Section>
      <Section title="Vianora’s approach" alt>
        <ul className="grid gap-3 sm:grid-cols-2">{s.help.map(h => <li key={h} className="flex gap-3 rounded-xl bg-navy2/70 p-4"><Check className="h-5 w-5 shrink-0 text-gold" aria-hidden />{h}</li>)}</ul>
        <p className="mt-6 max-w-3xl text-ink/90">{s.benefit}</p>
      </Section>
      <Section title="How it works">
        <ol className="grid gap-4 md:grid-cols-5">{process.map(([t, d], n) => <li key={t} className="rounded-2xl border border-cyan/25 p-4"><span className="font-display text-xl font-extrabold text-gold">{n + 1}</span><h3 className="mt-1 font-bold">{t}</h3><p className="mt-1 text-sm text-ink/85">{d}</p></li>)}</ol>
      </Section>
      <Section title="Frequently asked questions" alt><FAQ items={s.faqs} /></Section>
      <Section title={`Enquire about ${s.title}`}><div className="max-w-3xl"><EnquiryForm mode="lead" service={s.title} /></div></Section>
      <Section title="Related services"><div className="grid gap-5 md:grid-cols-2">{related.map(r => <ServiceCard key={r.slug} s={r} />)}</div>
        <p className="mt-6"><Link to="/services" className="font-semibold text-cyan hover:text-white">View all services</Link></p></Section>
      <CTA />
    </>
  )
}
