# Launch Checklist — naturesportrait.ca

DNS stays at **Squarespace**. The site is hosted on **Vercel**. Studio is deployed on sanity.studio.

---

## 1. Contact form email (Resend): done 2026-11-04

### Resend
- [x] Domains → Add Domain → `naturesportrait.ca` (region `us-east-1`; open and click tracking off)
- [x] Leave the page open with the DNS records to copy

### Squarespace: Domains → naturesportrait.ca → DNS → DNS Settings → Custom Records
In **Host**, enter only the subdomain part (e.g. `send`, not `send.naturesportrait.ca`).

| Type | Host | Value |
|---|---|---|
| TXT | `resend._domainkey` | copy from Resend (long `p=MIGf…QIDAQAB` key) |
| CNAME | `rsend` | copy from Resend (`rsend.fo…mta.net`) |
| CNAME | `send` | copy from Resend (`send.for…mta.net`) |

- [x] Add these under **Custom records → Add Record**
- [x] **Don't add a `_dmarc` record.** The Squarespace **Email Security** preset already has one (`p=reject`), and a second one would break DMARC. Keep that preset: it blocks spoofing, and Resend's DKIM signature still passes it.

- [x] Use Resend's copy buttons; the values shown on screen are cut short
- [x] Leave **Enable receiving** off in Resend
- [x] Ignore Resend's "Go to Google Cloud DNS" button. Squarespace runs on Google's DNS behind the scenes, but you edit the records in Squarespace.
- [x] Don't change the Squarespace Defaults or any existing root MX records yet
- [x] Resend → Verify (minutes to a few hours)

### Code (Claude, after Resend says Verified)
- [x] Switch the `from` address to `contact@naturesportrait.ca`, read from a `CONTACT_FORM_FROM` env var
- [x] HTML-escape name, subject and message in the email body
- [x] Open a PR
- [x] Tested locally: form email delivered via Resend to the Gmail inbox

The Resend account is **naturesportraitgallery** (naturesportraitgallery@gmail.com). Its sending key `naturesportrait-prod` is the one to use in Vercel. An older `re_eam…` key from a different Resend login can't send as this domain; delete it if you find which account it's in.

---

## 2. Before launch: Vercel project setup

### Environment variables (Vercel → Project → Settings → Environment Variables → Production)
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `NEXT_PUBLIC_SANITY_API_VERSION`
- [ ] `NEXT_PUBLIC_SANITY_STUDIO_URL`: the deployed Studio URL
- [ ] `SANITY_API_READ_TOKEN`
- [ ] `RESEND_API_KEY`: the `naturesportrait-prod` key from the naturesportraitgallery Resend account
- [ ] `CONTACT_FORM_TO`: Jill's real address
- [ ] `CONTACT_FORM_FROM`: `Nature's Portrait <contact@naturesportrait.ca>` (once the code PR lands)
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] `RECAPTCHA_SECRET_KEY`
- [ ] Redeploy after adding env vars. Vercel only picks them up on a new build.

### reCAPTCHA (google.com/recaptcha/admin)
- [ ] Add `naturesportrait.ca` and `www.naturesportrait.ca` to the key's domains

### Check the site on its `*.vercel.app` URL first
- [ ] Every page loads; contact form sends (Resend → Emails shows Delivered)

---

## 3. Go-live day: point the domain at Vercel

### Vercel: Project → Settings → Domains
- [ ] Add `naturesportrait.ca`
- [ ] Add `www.naturesportrait.ca`, set to **redirect** to `naturesportrait.ca`
- [ ] Vercel shows "Invalid Configuration" and lists the exact records it wants. Copy those values.
  - If it asks for a `TXT _vercel` verification record, add that too

### Squarespace: DNS Settings
- [ ] Delete the **Squarespace Defaults** preset (trash icon): 4 A records, the `www` CNAME and the `HTTPS` record. All of them have to go, including `HTTPS`. This takes any Squarespace site on the domain offline.
- [ ] Keep the **Squarespace Domain Connect** and **Email Security** presets
- [ ] Add the A record for `@` from Vercel
- [ ] Add the CNAME for `www` from Vercel
- [ ] Leave the Resend custom records (`resend._domainkey`, `rsend`, `send`) alone

### Back in Vercel
- [ ] Wait for both domains to show **Valid Configuration** (usually minutes, can take a few hours)
- [ ] Wait for Vercel to issue the SSL certificate automatically

### Sanity
- [ ] sanity.io/manage → API → CORS origins: add `https://naturesportrait.ca` (allow credentials)
- [ ] Set `SANITY_STUDIO_PREVIEW_URL=https://naturesportrait.ca` for Studio and redeploy it (`sanity deploy`), so Presentation previews the live site
- [ ] Studio → Settings: set `metadataBase` to `https://naturesportrait.ca`

---

## 4. After go-live
- [ ] Send a test message from the live contact form and check Jill's inbox and spam folder
- [ ] Check `https://www.naturesportrait.ca` redirects to `https://naturesportrait.ca`
- [ ] Add Jill's Google Business Profile URL to `sameAs` in `web/app/components/StructuredData.tsx`

## Other open items
- [ ] Home "Discover Acrylics" CTA needs a destination; FAQ hero CTA is labelled "Button"
- [ ] Studio: delete the 5 sample journal entries
- [ ] Studio: clear test SEO values on the Components page (or delete the page)
- [ ] Full QA pass at desktop and mobile (Claude)
