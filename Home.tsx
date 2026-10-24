import { Link } from 'react-router-dom'
import { Target, Megaphone, Magnet, Palette, BarChart3 } from 'lucide-react'
import { services, industries, process } from '../data'
import { Button, CTA, FAQ, HeroArt, Section, Seo, ServiceCard, TestimonialCard } from '../components/UI'

const values: [typeof Target, string, string][] = [
  [Target, 'Strategic Marketing', 'Plans built around your goals.'], [Megaphone, 'Targeted Advertising', 'Campaigns aimed at the right audience.'],
  [Magnet, 'Qualified Lead Generation', 'A clear path from visitor to enquiry.'], [Palette, 'Creative Content', 'Consistent, engaging brand communication.'],
  [BarChart3, 'Performance Measurement', 'Tracking what matters, then improving it.'],
]
const why = ['Business-focused marketing strategies', 'Audience-specific campaigns', 'Creative and consistent brand communication', 'Data-informed decision-making', 'Transparent reporting', 'Continuous optimisation']
const faqs: [string, string][] = [
  ['What services does Vianora provide?', 'Google Ads, Meta Ads, SEO, AI tools and automation, lead generation, video editing and content creation, brand growth and marketing consulting.'],
  ['How can digital marketing help my business?', 'It can increase visibility, reach the right audience and give potential customers a clear way to enquire. Results vary by business and market.'],
  ['Do you manage Google Ads campaigns?', 'Yes. We set up, manage and optimise Google Ads campaigns.'],
  ['Do you provide Facebook and Instagram advertising?', 'Yes. We plan and manage Meta Ads for both platforms.'],
  ['How does your lead generation process work?', 'We learn about your audience, build the enquiry path, run suitable campaigns and help you follow up.'],
  ['Do you offer SEO services?', 'Yes. We cover keyword research, on-page and technical SEO fundamentals and content optimisation.'],
  ['How can I get started with Vianora?', 'Use the “Get a Free Consultation” button and tell us about your business. We will discuss next steps.'],
]

export default function Home() {
  return (
    <>
      <Seo title="Vianora | Digital Marketing Agency | Premium Digital Marketing Solutions" desc="Vianora offers Google Ads management, Meta Ads, SEO services and lead generation to help businesses grow online." />
      <section className="grid-bg bg-gradient-to-b from-navy2 to-navy">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Turn Your Digital Presence Into Business Growth.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink/90">Strategic digital marketing, performance advertising, SEO, and creative solutions designed to help your business reach the right audience and generate meaningful enquiries.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/get-started" event="consultation_click">Get a Free Consultation</Button>
              <Button href="#services" variant="outline">Explore Our Services</Button>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>
      <Section title="Your Partner in Digital Growth">
        <p className="mb-8 max-w-3xl text-ink/90">Vianora combines strategy, advertising, creativity and technology so your marketing works together instead of in pieces.</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map(([Icon, t, d]) => <li key={t} className="rounded-2xl border border-cyan/20 p-5"><Icon className="h-7 w-7 text-gold" aria-hidden /><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></li>)}
        </ul>
      </Section>
      <div id="services" className="scroll-mt-20"><Section title="Our Services" alt>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(s => <ServiceCard key={s.slug} s={s} />)}</div>
      </Section></div>
      <Section title="Marketing With Strategy. Growth With Purpose.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{why.map(w => <li key={w} className="rounded-xl border-l-4 border-gold bg-navy2/60 p-4 font-medium">{w}</li>)}</ul>
        <p className="mt-6 text-sm text-ink/70">We do not promise specific leads, sales or returns. We focus on a sound process.</p>
      </Section>
      <Section title="Our Process" alt>
        <ol className="grid gap-4 md:grid-cols-5">{process.map(([t, d], i) => <li key={t} className="rounded-2xl border border-cyan/25 p-5"><span className="font-display text-2xl font-extrabold text-gold">{i + 1}</span><h3 className="mt-2 font-bold">{t}</h3><p className="mt-1 text-sm text-ink/85">{d}</p></li>)}</ol>
      </Section>
      <Section title="Industries We Serve">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{industries.map(([t, d]) => <div key={t} className="rounded-2xl border border-cyan/20 p-5"><h3 className="font-bold">{t}</h3><p className="mt-1 text-ink/85">{d}</p></div>)}</div>
      </Section>
      <Section title="Client Testimonials" alt>
        <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map(i => <TestimonialCard key={i} placeholder name="Client name" text="Verified client feedback will appear here once permission to publish has been received." />)}</div>
        <Link to="/reviews" className="mt-6 inline-block font-semibold text-cyan hover:text-white">Read more about reviews and share your experience</Link>
      </Section>
      <Section title="Frequently Asked Questions"><FAQ items={faqs} /></Section>
      <CTA />
    </>
  )
}
