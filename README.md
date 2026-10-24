# Vianora Website

React + Vite + TypeScript + Tailwind CSS v4 + React Router + Lucide icons.
Pages: Home, About, Services (+8 service pages), Reviews, Contact, Get Started (lead page), Thank You, Privacy, Terms, 404.

## 1. Install the tools
Install **Node.js 20+** (https://nodejs.org) and **Git** (https://git-scm.com). Check with `node -v` and `git -v`.

## 2. Get the project and install
```bash
cd vianora-website
npm install
```

## 3. Set up the form service (needed for real leads)
GitHub Pages cannot run a backend, so forms use an external form service such as **Formspree** (free tier available).
1. Create an account at formspree.io, create a form, and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`). Set the recipient email to the one that should receive leads.
2. Copy the example file and fill it in:
   ```bash
   cp .env.example .env
   ```
   Put the endpoint in `VITE_FORM_ENDPOINT`. Optionally create a second Formspree form for reviews (`VITE_REVIEW_ENDPOINT`) so they arrive separately for moderation.
3. Values starting with `VITE_` become **public** in the browser. Never put passwords or secret keys in them. `.env` is git-ignored.

Until this is set, forms show an error saying they are not connected. They never show a false success.

## 4. Run locally
```bash
npm run dev
```
Open the address shown (usually http://localhost:5173).

## 5. Build
```bash
npm run typecheck
npm run build
npm run preview
```

## 6. Put it on GitHub
```bash
git init
git add .
git commit -m "Initial Vianora website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/vianora-website.git
git push -u origin main
```
(Create the empty repository `vianora-website` on github.com first.)

## 7. Deploy with GitHub Pages
1. In the repo go to **Settings → Pages → Source: GitHub Actions**.
2. Go to **Settings → Secrets and variables → Actions → Variables** and add repository **variables**: `VITE_FORM_ENDPOINT`, and optionally `VITE_REVIEW_ENDPOINT`, `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_GTM_ID`.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes. Watch it under the **Actions** tab.
4. The site will be at `https://YOUR-USERNAME.github.io/vianora-website/`. With a custom domain, also add a variable `VITE_BASE` = `/`.

**Routing note:** GitHub Pages has no server routing, so the workflow copies `index.html` to `404.html` so deep links such as `/services/seo` still load. Unknown URLs show the in-app 404 page.

Netlify or Vercel also work: build command `npm run build`, output `dist`, add the same variables as environment variables, and add a rewrite of `/*` to `/index.html`.

## 8. Before launch checklist
- Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`.
- Replace the text logo in `src/components/Layout.tsx` with the official logo file (put it in `public/images/`). The logo image was not available when building.
- WhatsApp: set `VITE_WHATSAPP_NUMBER` in international format once the country code is confirmed. The button stays hidden until then.
- Confirm Facebook page URL (`facebook.com/Vianora`) and Instagram handle in `src/data.tsx`.
- Fill every **[CONFIRM]** item in Privacy Policy and Terms and get legal review.
- Analytics (GTM, Google Ads, Meta Pixel): set `VITE_GTM_ID`, then add the Google Ads and Meta Pixel tags inside Tag Manager. Events pushed: `lead_form_success`, `contact_click`, `consultation_click`, `service_view`, `service_explore_click`. Tags load only after cookie consent.
- Reviews are never published automatically. They are sent to your form inbox; add approved ones manually to `src/pages/Reviews.tsx`.
- Replace the placeholder testimonial cards when you have verified reviews.
