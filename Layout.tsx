import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, Instagram, Facebook, ChevronDown, MessageCircle } from 'lucide-react'
import { CONTACT, WHATSAPP, services } from '../data'
import { Button } from './UI'
import { GTM_ID, consentChoice, setConsent, loadGtm, track } from '../analytics'

export function Logo() {
  // Replace with the official logo file (e.g. /images/logo.png) when available.
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Vianora home">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden><path d="M12 18l20 30 20-30" fill="none" stroke="#00D4FF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M26 40l10-10 6 4 10-14" fill="none" stroke="#FFC928" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="font-display text-xl font-extrabold tracking-wide text-white">VIANORA</span>
    </Link>
  )
}

const link = ({ isActive }: { isActive: boolean }) => `px-3 py-2 font-medium hover:text-cyan ${isActive ? 'text-cyan' : 'text-white'}`

function Header() {
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); setDd(false) }, [pathname])
  return (
    <header className="sticky top-0 z-40 border-b border-cyan/15 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <div className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <button className="flex items-center gap-1 px-3 py-2 font-medium text-white hover:text-cyan" aria-expanded={dd} onClick={() => setDd(!dd)}>
              Services <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            {dd && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-cyan/25 bg-navy2 p-2 shadow-xl">
                <Link to="/services" className="block rounded px-3 py-2 font-semibold text-gold hover:bg-navy">All services</Link>
                {services.map(s => <Link key={s.slug} to={`/services/${s.slug}`} className="block rounded px-3 py-2 text-sm hover:bg-navy">{s.title}</Link>)}
              </div>
            )}
          </div>
          <NavLink to="/reviews" className={link}>Reviews</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
          <Button to="/get-started" event="consultation_click" className="ml-3 !py-2 text-sm">Get a Free Consultation</Button>
        </nav>
        <button className="p-2 text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-cyan/15 bg-navy2 px-5 py-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/reviews', 'Reviews'], ['/contact', 'Contact']].map(([to, l]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `py-3 text-lg ${isActive ? 'text-cyan' : 'text-white'}`}>{l}</NavLink>
            ))}
            <div className="ml-4 border-l border-cyan/30 pl-4">
              {services.map(s => <Link key={s.slug} to={`/services/${s.slug}`} className="block py-2 text-sm text-ink/85">{s.title}</Link>)}
            </div>
            <Button to="/get-started" event="consultation_click" className="mt-4">Get a Free Consultation</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  const h = 'mb-3 font-display font-bold text-white'
  return (
    <footer className="border-t border-cyan/15 bg-[#04122e]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-2 font-semibold text-gold">Ideas | Strategy | Growth</p>
          <p className="mt-3 text-sm text-ink/80">Premium digital marketing solutions to help businesses build their online presence and generate enquiries.</p>
        </div>
        <div><p className={h}>Quick links</p><ul className="space-y-2 text-sm">
          {[['/', 'Home'], ['/about', 'About'], ['/reviews', 'Reviews'], ['/contact', 'Contact'], ['/get-started', 'Get started']].map(([to, l]) => <li key={to}><Link className="hover:text-cyan" to={to}>{l}</Link></li>)}</ul></div>
        <div><p className={h}>Services</p><ul className="space-y-2 text-sm">
          {services.map(s => <li key={s.slug}><Link className="hover:text-cyan" to={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul></div>
        <div><p className={h}>Contact</p><ul className="space-y-3 text-sm">
          <li><a className="flex items-center gap-2 hover:text-cyan" href={`tel:${CONTACT.phone}`} onClick={() => track('contact_click', { type: 'phone' })}><Phone className="h-4 w-4 text-gold" aria-hidden />{CONTACT.phone}</a></li>
          <li><a className="flex items-center gap-2 hover:text-cyan" href={`mailto:${CONTACT.email}`} onClick={() => track('contact_click', { type: 'email' })}><Mail className="h-4 w-4 text-gold" aria-hidden />{CONTACT.email}</a></li>
          <li className="flex gap-4 pt-1">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Vianora on Instagram" className="hover:text-cyan"><Instagram /></a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Vianora on Facebook" className="hover:text-cyan"><Facebook /></a>
          </li></ul></div>
      </div>
      <div className="border-t border-cyan/10 px-5 py-5 text-center text-sm text-ink/70">
        <Link className="mx-3 hover:text-cyan" to="/privacy-policy">Privacy Policy</Link>
        <Link className="mx-3 hover:text-cyan" to="/terms">Terms and Conditions</Link>
        <p className="mt-2">© {new Date().getFullYear()} Vianora. All rights reserved.</p>
      </div>
    </footer>
  )
}

function Consent() {
  const [choice, setChoice] = useState(consentChoice())
  useEffect(() => { if (choice === 'yes') loadGtm() }, [choice])
  if (!GTM_ID || choice) return null
  const pick = (v: 'yes' | 'no') => { setConsent(v); setChoice(v) }
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-xl border border-cyan/30 bg-navy2 p-4 shadow-xl">
      <p className="text-sm">We use analytics cookies to understand how the site is used. You can accept or decline.</p>
      <div className="mt-3 flex gap-3"><Button onClick={() => pick('yes')} className="!py-2 text-sm">Accept</Button><Button variant="outline" onClick={() => pick('no')} className="!py-2 text-sm">Decline</Button></div>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const wa = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Vianora, I would like to know more about your digital marketing services.')}` : null
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
        {wa && <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" onClick={() => track('contact_click', { type: 'whatsapp' })} className="rounded-full bg-gold p-3.5 text-navy shadow-lg hover:bg-white"><MessageCircle /></a>}
        <a href={`tel:${CONTACT.phone}`} aria-label="Call Vianora" onClick={() => track('contact_click', { type: 'phone' })} className="rounded-full bg-electric p-3.5 text-white shadow-lg hover:bg-cyan hover:text-navy"><Phone /></a>
      </div>
      <Consent />
    </>
  )
}
