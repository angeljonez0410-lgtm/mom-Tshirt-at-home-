# Mom Hustle Tees Sales App

High-converting landing page and checkout flow for the digital product:
Mom Hustle Tees: The Stay-at-Home Mom's Guide to Starting a T-Shirt Business From Home.

Built with Next.js, React, TypeScript, Tailwind CSS, Stripe Checkout, and Resend email support.

## Run Locally (Codespaces Friendly)

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Project Structure

- app/page.tsx: Homepage with all landing sections
- app/success/page.tsx: Purchase success page with confetti and download button
- app/api/checkout/route.ts: Stripe checkout session creation
- app/api/webhook/route.ts: Stripe webhook handler, triggers delivery email
- components/: Reusable page sections and checkout button
- data/content.ts: Local demo content and editable marketing copy
- lib/stripe.ts: Stripe client helper
- lib/email.ts: Resend email delivery helper

## Where To Edit Business Content

- Update pricing and social links: data/content.ts
- Update ebook bullets and product name: lib/constants.ts
- Update Stripe product metadata and amount: app/api/checkout/route.ts
- Update preview/gallery images: public/images/page-previews/
- Update footer links: components/Footer.tsx

Comments are already included in key files to show where to edit products, prices, images, and links.

## Stripe Setup

1. Add env vars in .env.local:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL

2. Create product in Stripe dashboard:
- Name: Mom Hustle Tees Ebook
- Amount: $37.00

3. Add webhook endpoint:
- https://your-domain.com/api/webhook
- Event: checkout.session.completed

If Stripe keys are missing, checkout falls back to demo mode and redirects to /success so buttons still work during local preview.

## Email Delivery (Resend)

Set RESEND_API_KEY and EBOOK_PDF_URL.

On successful checkout webhook, buyer gets an automated delivery email with your download link.

## Analytics

- Vercel Analytics is enabled in app/layout.tsx
- Google Analytics 4 is loaded when NEXT_PUBLIC_GA_ID is set
- Events tracked:
	- cta_click
	- checkout_initiated
	- purchase_completed
	- scroll_depth
	- time_on_page

## Deploy To Vercel

1. Push this repo to GitHub.
2. Import repository into Vercel.
3. Add all variables from .env.example.
4. Deploy.
5. Configure Stripe webhook URL in production.
6. Test checkout in Stripe test mode.
7. Switch to live keys when ready.

## Launch Checklist

- Domain connected
- SSL active
- Stripe live keys set
- Webhook tested
- Email delivery tested
- Ebook download URL verified
- Mobile responsive check completed
- Analytics verified
- Privacy/Terms/Contact pages reviewed

## Vercel Environment Variables Checklist

Add these in Vercel Project Settings -> Environment Variables for `Production`, `Preview`, and `Development` as needed:

- `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
- `STRIPE_SECRET_KEY` = `sk_live_or_test_...`
- `STRIPE_WEBHOOK_SECRET` = `whsec_...`
- `RESEND_API_KEY` = `re_...`
- `NEXT_PUBLIC_GA_ID` = `G-...`
- `NEXT_PUBLIC_EBOOK_PDF_URL` = `https://your-storage.com/mom-hustle-tees-ebook.pdf`
- `EBOOK_PDF_URL` = `https://your-storage.com/mom-hustle-tees-ebook.pdf`

Optional (not required by current server code):

- `STRIPE_PUBLIC_KEY` = `pk_live_or_test_...`

## Stripe + Webhook Test Commands

Use these commands locally before going live.

1. Start local app:

```bash
npm run dev
```

2. In another terminal, forward Stripe webhooks to local API and capture signing secret:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the printed `whsec_...` and set `STRIPE_WEBHOOK_SECRET` in `.env.local`.

3. Trigger checkout completed event:

```bash
stripe trigger checkout.session.completed
```

4. Verify webhook route handled event and email sent:

- Check app terminal logs for successful webhook handling.
- Confirm delivery email is sent via Resend dashboard activity.

5. Test checkout endpoint response directly:

```bash
curl -s -X POST http://localhost:3000/api/checkout \
	-H "Content-Type: application/json" \
	-d '{"source":"manual-test"}'
```

Expected result:

- With Stripe keys configured: JSON with Stripe checkout `url`.
- Without Stripe keys: JSON with local demo success URL (`/success?demo=1`).

## Production Go-Live Sequence

1. Add production env vars in Vercel.
2. Deploy.
3. Set Stripe webhook endpoint to `https://your-domain.com/api/webhook`.
4. Complete one Stripe test transaction.
5. Verify redirect to `/success`, email delivery, and PDF download.
6. Switch Stripe keys to live mode and redeploy.
