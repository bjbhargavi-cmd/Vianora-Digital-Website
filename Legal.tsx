import { CONTACT } from '../data'
import { PageBanner, Section, Seo } from '../components/UI'
type Block = [string, string]
function Legal({ title, seoTitle, blocks }: { title: string; seoTitle: string; blocks: Block[] }) {
  return (
    <>
      <Seo title={seoTitle} desc={`${title} for the Vianora website.`} />
      <PageBanner title={title} />
      <Section><div className="max-w-3xl space-y-6">
        <p className="rounded-lg border border-gold/60 bg-gold/10 p-4 text-gold">Draft: this document must be reviewed by the business owner and, where appropriate, a legal professional before publication. Items marked [CONFIRM] need the owner’s confirmation.</p>
        {blocks.map(([h, t]) => <div key={h}><h2 className="text-xl font-bold">{h}</h2><p className="mt-2 text-ink/90">{t}</p></div>)}
      </div></Section>
    </>
  )
}
export function PrivacyPolicy() {
  return <Legal title="Privacy Policy" seoTitle="Privacy Policy | Vianora" blocks={[
    ['Information collected', 'When you submit a form we collect the details you enter: name, business name, email, phone number, industry, service interest, budget (optional) and your message. Review forms may also collect a rating and written feedback.'],
    ['How information is used', 'We use your details to respond to your enquiry and discuss suitable services. Reviews are only published with your consent and after approval.'],
    ['Form submissions', 'Form data is sent to a third-party form service configured by Vianora. [CONFIRM: name of the service, where data is stored and who has access.]'],
    ['Contact and marketing communications', 'We will contact you about your enquiry. [CONFIRM: whether Vianora sends marketing emails and how to opt out.]'],
    ['Cookies and analytics', 'Analytics are only loaded if configured, and only after you accept the cookie banner. [CONFIRM: which analytics and advertising tools are enabled.]'],
    ['Third-party services', 'We may use third-party services for forms, analytics and advertising platforms. Their own privacy policies apply to their handling of data.'],
    ['Data retention', '[CONFIRM: how long enquiry data is kept.]'],
    ['Data security', 'We take reasonable steps to protect information. [CONFIRM: specific security measures in place.]'],
    ['Your rights', 'You may ask to access, correct or delete your personal information. [CONFIRM: the rights that apply in your location.]'],
    ['Privacy enquiries', `Email ${CONTACT.email} or call ${CONTACT.phone}.`],
  ]} />
}
export function Terms() {
  return <Legal title="Terms and Conditions" seoTitle="Terms and Conditions | Vianora" blocks={[
    ['Website usage', 'By using this website you agree to use it lawfully and not to misuse its forms or content.'],
    ['Service descriptions', 'Descriptions on this site are general. The exact scope, deliverables and fees for any service are agreed separately in writing.'],
    ['Enquiries and consultations', 'Submitting an enquiry does not create a service agreement. Outcomes are not guaranteed.'],
    ['Intellectual property', 'Website content, branding and design belong to Vianora and may not be copied without permission.'],
    ['Third-party services', 'The site may link to or rely on third-party services that we do not control.'],
    ['Website availability', 'We aim to keep the site available but do not guarantee uninterrupted access.'],
    ['Limitations of responsibility', '[CONFIRM with legal review: limitation of liability wording.]'],
    ['Changes to website content', 'We may update the site and these terms at any time.'],
    ['Contact', `Email ${CONTACT.email} or call ${CONTACT.phone}.`],
  ]} />
}
