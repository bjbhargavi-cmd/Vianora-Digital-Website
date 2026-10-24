import { useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button, Seo } from '../components/UI'
import { ContactOptions } from './Contact'
export default function ThankYou() {
  const ok = (useLocation().state as { submitted?: boolean } | null)?.submitted === true
  return (
    <>
      <Seo title="Thank You | Vianora" desc="Confirmation page for Vianora enquiries." noindex />
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold" aria-hidden />
        <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">{ok ? 'Thank You for Contacting Vianora!' : 'Enquiry Confirmation'}</h1>
        <p className="mt-4 text-ink/90">{ok ? 'Your enquiry has been submitted successfully. We appreciate your interest in Vianora Digital Marketing Solutions.' : 'This page appears after an enquiry has been submitted. If you would like to get in touch, you can start below.'}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Button to="/">Back to Home</Button><Button to="/services" variant="outline">Explore Services</Button>{!ok && <Button to="/get-started" variant="outline">Send an Enquiry</Button>}</div>
        <div className="mt-10 text-left"><ContactOptions /></div>
      </section>
    </>
  )
}
