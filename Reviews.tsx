import { CTA, PageBanner, Section, Seo, TestimonialCard, Button } from '../components/UI'
import { ReviewForm } from '../components/Forms'
export default function Reviews() {
  return (
    <>
      <Seo title="Client Reviews | Vianora Digital Marketing Solutions" desc="Read client feedback about Vianora or share your own experience." />
      <PageBanner title="Client Reviews" text="We publish only genuine feedback from clients who have given permission. Reviews appear here after approval." />
      <Section title="What clients say">
        <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map(i => <TestimonialCard key={i} placeholder name="Client or business name" service="Service" text="No verified reviews have been published yet. This card will be replaced with real feedback once permission is received." />)}</div>
        <Button href="#share" variant="outline" className="mt-8">Share Your Experience</Button>
      </Section>
      <div id="share" className="scroll-mt-20"><Section title="Share your experience" alt><div className="max-w-3xl"><ReviewForm /></div></Section></div>
      <CTA title="Thinking About Working With Vianora?" text="Tell us about your business and goals." label="Get a Free Consultation" />
    </>
  )
}
