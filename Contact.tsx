import { Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { CONTACT } from '../data'
import { PageBanner, Section, Seo } from '../components/UI'
import { EnquiryForm } from '../components/Forms'
import { track } from '../analytics'

export function ContactOptions() {
  const c = 'flex items-center gap-3 rounded-xl border border-cyan/25 p-4 hover:border-cyan'
  return (
    <ul className="space-y-3">
      <li><a className={c} href={`tel:${CONTACT.phone}`} onClick={() => track('contact_click', { type: 'phone' })}><Phone className="text-gold" aria-hidden />{CONTACT.phone}</a></li>
      <li><a className={c} href={`mailto:${CONTACT.email}`} onClick={() => track('contact_click', { type: 'email' })}><Mail className="text-gold" aria-hidden />{CONTACT.email}</a></li>
      <li><a className={c} href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="text-gold" aria-hidden />Instagram: Vianora_2026</a></li>
      <li><a className={c} href={CONTACT.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="text-gold" aria-hidden />Facebook: Vianora</a></li>
    </ul>
  )
}
export default function Contact() {
  return (
    <>
      <Seo title="Contact Vianora | Let’s Discuss Your Growth" desc="Contact Vianora about Google Ads, Meta Ads, SEO and lead generation for your business." />
      <PageBanner title="Tell Us About Your Business Goals." text="Share your requirements with us, and let’s explore the right digital marketing approach for your business." />
      <Section><div className="grid gap-8 lg:grid-cols-[1fr_2fr]"><ContactOptions /><EnquiryForm mode="contact" /></div></Section>
    </>
  )
}
