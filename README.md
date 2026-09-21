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
