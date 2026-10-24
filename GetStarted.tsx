import { ShieldCheck } from 'lucide-react'
import { Seo } from '../components/UI'
import { EnquiryForm } from '../components/Forms'
import { ContactOptions } from './Contact'
export default function GetStarted() {
  return (
    <>
      <Seo title="Get Started | Free Digital Marketing Consultation | Vianora" desc="Tell Vianora about your business and goals to request a free digital marketing consultation." />
      <section className="grid-bg bg-gradient-to-b from-navy2 to-navy">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h1 className="text-3xl font-extrabold md:text-5xl">Let’s Build a Digital Marketing Strategy for Your Business.</h1>
            <p className="mt-5 text-ink/90">Tell us about your business, your goals, and the marketing support you need. Vianora will use this information to understand your requirements and discuss suitable next steps.</p>
            <ul className="mt-6 space-y-2 text-ink/90"><li>Strategy tailored to your goals</li><li>Advertising, SEO and content under one roof</li><li>Clear reporting and ongoing optimisation</li></ul>
            <p className="mt-6 flex items-start gap-2 text-sm text-ink/80"><ShieldCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden />Your details are used only to respond to your enquiry.</p>
            <h2 className="mb-3 mt-8 text-lg font-bold">Prefer to talk directly?</h2>
            <ContactOptions />
          </div>
          <EnquiryForm mode="lead" />
        </div>
      </section>
    </>
  )
}
