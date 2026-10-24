import { services, process } from '../data'
import { Button, CTA, PageBanner, Section, Seo } from '../components/UI'
const values = ['Creativity', 'Transparency', 'Strategic Thinking', 'Customer Focus', 'Continuous Improvement', 'Responsible Use of Technology']
export default function About() {
  return (
    <>
      <Seo title="About Vianora | Digital Marketing Solutions" desc="Learn about Vianora’s mission, vision, values and approach to digital marketing." />
      <PageBanner title="Helping Businesses Grow in a Digital-First World." text="Vianora is a premium digital marketing partner focused on growth, lead generation and measurable outcomes. Ideas | Strategy | Growth." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan/25 p-6"><h2 className="text-2xl font-bold">Our mission</h2><p className="mt-3">To help businesses connect with their ideal audiences through strategic, creative, and performance-focused digital marketing.</p></div>
          <div className="rounded-2xl border border-cyan/25 p-6"><h2 className="text-2xl font-bold">Our vision</h2><p className="mt-3">To become a trusted digital marketing partner for businesses seeking sustainable growth and stronger online visibility.</p></div>
        </div>
      </Section>
      <Section title="Our values" alt><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{values.map(v => <li key={v} className="rounded-xl border-l-4 border-gold bg-navy2/70 p-4 font-medium">{v}</li>)}</ul></Section>
      <Section title="What we do"><p className="max-w-3xl text-ink/90">Vianora offers {services.map(s => s.title).join(', ')}.</p></Section>
      <Section title="How we work" alt><ol className="grid gap-4 md:grid-cols-5">{process.map(([t, d], i) => <li key={t} className="rounded-2xl border border-cyan/25 p-4"><span className="font-display text-xl font-extrabold text-gold">{i + 1}</span><h3 className="mt-1 font-bold">{t}</h3><p className="mt-1 text-sm text-ink/85">{d}</p></li>)}</ol></Section>
      <Section title="Why consider Vianora"><p className="max-w-3xl text-ink/90">We combine strategy, advertising, creative work and technology, explain what we are doing, and keep improving campaigns based on performance data.</p><Button to="/get-started" event="consultation_click" className="mt-6">Get a Free Consultation</Button></Section>
      <CTA />
    </>
  )
}
