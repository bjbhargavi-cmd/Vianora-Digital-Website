import { Button, Seo } from '../components/UI'
export default function NotFound() {
  return (
    <section className="grid-bg mx-auto max-w-2xl px-5 py-24 text-center">
      <Seo title="Page Not Found | Vianora" desc="The page you requested could not be found." noindex />
      <p className="font-display text-7xl font-extrabold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-bold">We couldn’t find that page.</h1>
      <p className="mt-3 text-ink/90">The link may be broken or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4"><Button to="/">Back to Home</Button><Button to="/services" variant="outline">Services</Button><Button to="/contact" variant="outline">Contact</Button></div>
    </section>
  )
}
