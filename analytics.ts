// Analytics only runs when VITE_GTM_ID is set AND the visitor accepted the consent banner.
declare global { interface Window { dataLayer?: unknown[] } }
export const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined
const KEY = 'vianora-consent'
export const consentChoice = () => { try { return localStorage.getItem(KEY) } catch { return null } }
export function setConsent(v: 'yes' | 'no') {
  try { localStorage.setItem(KEY, v) } catch { /* storage unavailable */ }
  if (v === 'yes') loadGtm()
}
export function loadGtm() {
  if (!GTM_ID || document.getElementById('gtm-script')) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.id = 'gtm-script'; s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
  document.head.appendChild(s)
}
/** Never pass personal data (names, emails, phone numbers) as params. */
export function track(event: string, params: Record<string, string> = {}) {
  if (GTM_ID && consentChoice() === 'yes') { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event, ...params }) }
}
