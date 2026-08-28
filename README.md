# Multi Sheba - Phase 1 + 2 MVP

A Next.js site where customers browse services, submit a request with
documents, pay manually via bKash/Nagad, and get a tracked reference
number. You manage orders from a password-gated `/admin` page.

## What this is (and isn't)

**Built:** service catalog (15 curated, remotely-deliverable services -
see `lib/services.ts`), dynamic order form per service, file upload to
Supabase Storage, manual payment confirmation flow, order reference
numbers, admin dashboard to verify payment and update order status.

**Not built, on purpose:**

- **Real payment gateway.** SSLCommerz/Aamarpay require a trade license,
  DBID, and TIN before they'll approve a merchant account - you don't
  have those yet. This app collects a transaction ID after a manual
  bKash/Nagad "Send Money" payment, which you verify by hand in
  `/admin`. Swap this for a real gateway once your paperwork is done -
  it's a contained change (mainly `components/OrderForm.tsx` and a new
  webhook API route).
- **Physical delivery/courier integration.** Photocopying, lamination,
  binding, physical NID printing, etc. are deliberately excluded from
  the service list because a website can't fulfill them - you'd need a
  physical counter or courier partnership. Add them back in
  `lib/services.ts` once you've solved that operationally.
- **The other ~50 services from your original list.** Same reason.
  Adding a new service later is editing one object in
  `lib/services.ts` - cheap. Building 68 order forms nobody's ordered
  yet was the wrong place to spend your time.

## 1. Set up Supabase (free tier)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** → paste and run `supabase/schema.sql`.
3. Go to **Storage** → create a bucket named `order-documents`, set it
   Public, and add the upload policy described at the bottom of
   `supabase/schema.sql`.
4. Go to **Project Settings → API** → copy your Project URL, anon key,
   and service role key.

## 2. Configure environment variables

```bash
cp .env.example .env.local
# fill in the four values
```

## 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site, `/admin` for the dashboard
(password = whatever you set as `ADMIN_PASSWORD`).

## 4. Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. In **Environment Variables**, add the same four keys from
   `.env.local`.
4. Deploy. Vercel builds and hosts the frontend + API routes
   automatically - no separate backend server needed for this MVP.
5. Point your domain (e.g. `multisheba.com`) at the Vercel project
   under **Settings → Domains**.

## Fixing "supabaseUrl is required" when running locally

This means `.env.local` doesn't exist yet or is missing values. Do:

```bash
cp .env.example .env.local
# then fill in the 4 real values from your Supabase project (see below)
```

The app now also degrades gracefully: services with no file upload (like
mobile recharge) never touch Supabase at all, and if Supabase genuinely
isn't configured you'll get a clear on-screen message instead of a raw
library crash.

## Full catalog - all 68 original services, consolidated to 50 forms

Building 68 separate forms for services that are really the same task
(e.g. "Job Application Submission" and "Government Job Application")
would mean redundant UI and more for you to maintain. Instead, every one
of your original 68 items is covered by one of the 50 services in
`lib/services.ts` - see the comment at the top of that file. Rough
mapping:

- Duplicated form-fill services (job, admission, exam registration,
  scholarship, admit card/result) → one form each, phrased generically.
- NID-related items (printing, download, correction) → split into
  "download/print" vs "correction" since those are genuinely different
  workflows.
- Design/print items (poster, visiting card, menu/leaflet) → kept as
  separate services since the deliverable is genuinely different.
- Anything requiring physical handling (photocopy, lamination, binding,
  photo/document printing, pen drive transfer) is tagged
  `deliveryMode: "physical"` and shows a "Pickup/Courier" badge on the
  site - customers see upfront that it's not a pure digital order.

Add or split services anytime by editing `lib/services.ts` - each entry
is a plain object, not code you need to touch elsewhere.

## What's new in this update

- **Bangla/English toggle** - top-right on every page, defaults to Bangla, remembers your choice (`contexts/LanguageContext.tsx`, `lib/i18n.ts`). Service names, summaries, and every form field/label are translated (`lib/services.ts`). Not machine-translated at runtime - every string is hand-written in both languages, so there's no translation API cost.
- **FAQ page** at `/faq` - bilingual accordion, content in `lib/faq.ts`.
- **AI chatbot** - bottom-right floating widget on every page. When configured, it calls the server-side `/api/chat` route with grounded service and FAQ context. Set `OPENAI_API_KEY` (or `AI_API_KEY`) and optionally `AI_MODEL` / `AI_BASE_URL` in `.env.local`; the default model is `gpt-4o-mini` and the default endpoint is OpenAI's Chat Completions API. If the provider is unavailable or not configured, the client falls back to the local service and FAQ matcher.

**Two placeholder values you must change before launch:**

- `components/Chatbot.tsx` → `WHATSAPP_NUMBER` (currently a fake number)
- `components/OrderForm.tsx` → `PAYMENT_NUMBER` (currently `01XXXXXXXXX`)
- Also update the WhatsApp links hardcoded in `app/page.tsx` and `app/faq/page.tsx` (`https://wa.me/8801000000000`)

## Next steps, in order

1. **Launch and get 10 real orders manually verified through
   `/admin`.** Don't touch the payment gateway question until this
   works end-to-end with real customers.
2. **Get your trade license + DBID moving in parallel** - it's the
   long pole, start it now, not after the site is "done."
3. **Swap manual payment for bKash Merchant or SSLCommerz** once
   licensed.
4. **Decide your physical fulfillment model** (in-person counter?
   courier partner?) before re-adding physical services to the
   catalog - don't let the website promise something operations can't
   back up.
