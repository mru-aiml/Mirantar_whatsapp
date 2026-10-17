# MIRANTAR — Private Tours & Cab Service from Pune

**MIRANTAR — MOVING FORWARD. ALWAYS.**

Premium single-page-app website for a Pune-based private Ertiga tour service.
No backend, no database, no accounts, no payments — visitors send a **booking
enquiry via WhatsApp**, and Mirantar confirms availability and final fare manually.

## Control panels (change the business without touching components)

| File | Controls |
| ---- | -------- |
| `src/config/businessConfig.js` | Phone / WhatsApp number, name, tagline, city, website, base location, vehicle, logo |
| `src/config/pricingConfig.js` | Regular prices, included km, extra-km rate, Ganpati launch offer on/off, package availability |
| `src/config/tourConfig.js` | Categories, default passenger limit, shared fare/distance notes |
| `src/data/ganpatiPackages.js` | Package names, temples, routes, descriptions, highlights |
| `src/data/images.js` | Every image path on the site |

## How to change the phone / WhatsApp number

`src/config/businessConfig.js`:

```js
phone: '919876543210',     // digits only, with country code
whatsapp: '919876543210',  // digits only, with country code
```

Rebuild and redeploy — navbar, footer, call buttons, all WhatsApp buttons,
booking forms, contact page and CTAs follow automatically. There is exactly
one place a `wa.me` link is constructed: `createWhatsAppLink()` in
`src/utils/whatsapp.js`.

## How to change package prices

`src/config/pricingConfig.js` → `packages.<key>.regularPrice`:

```js
puneGanpatiCircuit: { regularPrice: 3999, includedKm: 200, extraKmRate: 18, enabled: true },
```

## How to change included kilometres / extra-km rate

Same file: edit `includedKm` / `extraKmRate` per package (or
`distance.extraKmRate` / `distance.defaultIncludedKm` for defaults).
Every package card, detail page, booking form and WhatsApp message updates
automatically. Set a package's `enabled: false` to hide it site-wide.

## How to enable / disable the Ganpati launch offer

```js
ganpatiLaunchOffer: { enabled: true, discountPerVehicle: 500, label: 'Ganpati Launch Offer' },
```

Setting `enabled: false` hides launch prices everywhere and shows only the
regular price. No component edits needed.

## How pricing is calculated

`src/utils/pricing.js`:

- `calculateExtraDistanceCharge(actualKm, includedKm, extraKmRate)` — e.g.
  215 km on a 200 km package at ₹18/km → 15 × 18 = **₹270**.
- `calculateFinalPrice(base, actualKm, includedKm, rate, discount)` — e.g.
  3999 + 540 − 500 = **₹4039**.
- `calculateDiscountedPrice(base, discount)` — discount can never exceed price;
  all inputs are clamped to ≥ 0.
- Unknown actual distance is never guessed: the site shows the base price
  plus the distance policy until Mirantar confirms the final fare on WhatsApp.

## Images

```
public/images/
  logo/          mirantar-logo.png
  hero/          pune-ghats.svg
  tours/         one file per tour (bhimashankar, lonavala, …)
  ashtavinayak/  theur, ranjangaon, ozar, lenyadri, morgaon, siddhatek, pali, mahad
  vehicle/       ertiga.svg  ← labelled placeholder
  destinations/  placeholder.svg  ← automatic fallback for any failed image
```

Current artwork is clearly-labelled branded SVG placeholders with TODO
comments — no unrelated stock photo is presented as a destination, and no
stock vehicle is presented as Mirantar's Ertiga. To use a real photo, drop
the file in the matching folder and update **only** `src/data/images.js`.
Any image that still fails at runtime is replaced in-browser by `SafeImage`
with the neutral branded fallback (no broken-image icons).

## Run locally

```powershell
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
npm run preview  # preview the production build
```

## Remaining TODOs

- [ ] Put the real number in `businessConfig.js` (`phone`, `whatsapp`).
- [ ] Replace SVG placeholders with real Mirantar / destination photography.
- [ ] Confirm the "defined service area" wording for Pune pickup/drop.
- [ ] Verify any non-Ganpati tour fare before switching it from quote → fixed.
- [ ] Add SPA fallback (`/* → /index.html`) on the static host for deep links.
- [ ] Optional: connect Google Maps/Mapbox later for live distance measurement.

## Festive offer configuration

The festive offer is controlled centrally in src/config/pricingConfig.js under estiveOffer. Change enabled, code, discountAmount, minRegularFare, maxConfirmedBookings, eligibleTripType or llowCombination there; the banner, festive offers section, tour cards, pricing page, booking form and WhatsApp messages update automatically.

Eligibility: outstation round-trip packages with a regular fare of at least the configured minimum. The festive discount is never combined with another promotional discount unless llowCombination is true, and it is never applied to one-way transfers, local packages, airport transfers or custom quotes by default.

Booking advance (ooking.advanceAmount, Rs. 500) is separate from the festive discount. For an eligible booking:

- discounted package fare = regular package fare - festive discount
- remaining package balance = discounted package fare - booking advance

## Festive offer claim limit (static SPA limitation)

This project is a static React SPA with no backend or database. The "first 10 confirmed eligible bookings" limit cannot be enforced securely on the client. Booking submissions are enquiries only; Mirantar confirms availability, eligibility, offer status and final fare manually. If a backend is added later, enforce the limit with a transactional, database-backed counter and a booking/offer status lifecycle (request submitted -> availability confirmed -> advance received -> booking confirmed), reserving an offer only on confirmation and releasing it on cancellation/expiry.

## Price sheet sync audit

### A. In the price sheet and already on the website
- Pune to Mumbai (One-Way): added, Rs 3,149.
- Pune to Mumbai (Round Trip): added, Rs 4,849.
- Pune to Lonavala: existing Lonavala & Khandala tour updated to Rs 4,399 / 300 km.
- Pune to Bhimashankar: existing Bhimashankar Yatra updated to Rs 4,399 / 300 km.
- Pune to Mahabaleshwar: existing Mahabaleshwar & Panchgani tour updated to Rs 4,899 / 300 km.
- Pune to Shirdi: existing Shirdi Darshan updated to Rs 5,849 / 400 km.
- Pune to Goa: added, Rs 14,499 / 1,000 km.
- Pune to Trimbakeshwar: existing Nashik & Trimbakeshwar tour updated to Rs 7,349 / 500 km.
- Pune to Tuljapur: added, Rs 8,399 / 600 km.
- Pune to Pandharpur: added, Rs 7,349 / 500 km.
- Pune to Akkalkot: added, Rs 9,099 / 650 km.
- Pune to Solapur: added, Rs 7,349 / 500 km.
- Pune to Kolhapur: added, Rs 7,349 / 500 km.
- Pune to Satara: added, Rs 4,399 / 300 km.
- Local packages: Half-Day/Full-Day/Extended Local added.

### B. In the price sheet but missing from the website
All 14 outstation routes and 3 local packages are now present in the catalogue and booking selector.

### C. On the website but not covered by the price sheet
- Jejuri Darshan (Rs 2,999) - no matching price-sheet entry.
- Bhuleshwar + Jejuri (Rs 3,299) - no matching price-sheet entry.
- Raigad Fort (Rs 4,499) - no matching price-sheet entry.
- Mulshi & Tamhini (Rs 3,499) - no matching price-sheet entry.
- Pune Heritage (Rs 2,499) - no matching price-sheet entry.
- Sinhagad + Khadakwasla (Rs 2,499) - no matching price-sheet entry.
- Matheran (quote) - no matching price-sheet entry.
- Bhandardara (quote) - no matching price-sheet entry.
- Pratapgad (quote) - no matching price-sheet entry.
- Shivneri (quote) - no matching price-sheet entry.
- Ajanta & Ellora (quote) - no matching price-sheet entry.
- Alandi & Dehu (quote) - no matching price-sheet entry.
- Ashtavinayak (quote) - covered by Ganpati Special packages.
- Ganpati Special packages (Rs 3,999 to Rs 8,499) - not listed in the new price sheet; retained at existing regular prices for review.

### Route discrepancies
- Lonavala & Khandala includes Khandala; price sheet lists Pune to Lonavala only.
- Mahabaleshwar & Panchgani includes Panchgani; price sheet lists Pune to Mahabaleshwar only.
- Nashik & Trimbakeshwar includes Nashik; price sheet lists Pune to Trimbakeshwar only.
- Shirdi Darshan itinerary should be reviewed against the 400 km Shirdi package.
- Bhimashankar Yatra should be reviewed against the 300 km Bhimashankar package.

### Removed promotions
- Removed Ganpati launch offer labels, launch prices, and related calculations.
- Removed expired minimum-fare restriction for the festive offer.
