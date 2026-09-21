/*
 * ═══════════════════════════════════════════════════════════════════
 *  MIRANTAR PRICING CONTROL PANEL
 * ═══════════════════════════════════════════════════════════════════
 *  Change prices, included kilometres and extra-km rates HERE.
 *
 *  DO NOT modify individual components to change prices.
 *
 *  HOW TO:
 *  - Change a package price      → edit `regularPrice` below.
 *  - Change included kilometres  → edit `includedKm` for that package.
 *  - Change the extra-km rate     → edit `extraKmRate` (per package,
 *                                   or `distance.extraKmRate` default).
 *  - Change the Ganpati discount  → edit `ganpatiLaunchOffer`.
 *  - Disable the launch offer     → set `ganpatiLaunchOffer.enabled`
 *                                   to false (launch prices hide
 *                                   automatically site-wide).
 *  - Hide a package               → set its `enabled` to false.
 *  - Change the booking advance    → edit `booking.advanceAmount`.
 *                                     (Adjusted against the final trip
 *                                     fare — it is NOT an extra charge.)
 *
 *  All prices are in INR, per vehicle (NOT per person).
 */

export const pricingConfig = {
  currency: 'INR',

  // ── Booking advance (reservation) ──────────────────────────────────
  // Required to reserve the Ertiga for a selected date. Adjusted
  // against the final trip fare — never added on top of it.
  booking: {
    advanceAmount: 500,
  },

  // ── Ganpati seasonal offer ─────────────────────────────────────────
  ganpatiLaunchOffer: {
    enabled: true,
    discountPerVehicle: 500,
    label: 'Ganpati Launch Offer',
  },

  // ── General distance pricing defaults ──────────────────────────────
  // Per-package values below take precedence over these defaults.
  distance: {
    defaultIncludedKm: 200,
    extraKmRate: 18,
  },

  // ── Fixed packages (keys are referenced by src/data/ganpatiPackages.js)
  // ── includedKm / extraKmRate differ per package — keep them here. ──
  // NOTE (owner price table): Morya 4499 / Vighnaharta 4999 /
  // Konkan 6499 / Maha 8499 / Pune Circuit 3999.
  packages: {
    puneGanpatiCircuit: {
      regularPrice: 3999,
      includedKm: 180,
      extraKmRate: 18,
      enabled: true,
    },

    vighnahartaYatra: {
      regularPrice: 4999,
      includedKm: 260,
      extraKmRate: 18,
      enabled: true,
    },

    moryaDarshan: {
      regularPrice: 4499,
      includedKm: 250,
      extraKmRate: 18,
      enabled: true,
    },

    konkanGanpatiYatra: {
      regularPrice: 6499,
      includedKm: 300,
      extraKmRate: 18,
      enabled: true,
    },

    mahaAshtavinayakDayYatra: {
      regularPrice: 8499,
      includedKm: 350,
      extraKmRate: 18,
      enabled: true,
    },
  },

  // ── General tour prices (keys are referenced by src/data/tours.js) ──
  // All prices are PER VEHICLE (Ertiga, up to 6 passengers).
  // Tours WITHOUT an entry here show "Get a Quote" site-wide.
  // (Owner price table; extraKmRate falls back to distance.extraKmRate.)
  tours: {
    puneHeritage: { price: 2499, includedKm: 80 },
    sinhagadKhadakwasla: { price: 2499, includedKm: 100 },
    mulshiTamhini: { price: 3499, includedKm: 150 },
    lonavalaKhandala: { price: 3499, includedKm: 160 },
    jejuriDarshan: { price: 2999, includedKm: 130 },
    bhuleshwarJejuri: { price: 3299, includedKm: 150 },
    bhimashankarYatra: { price: 3999, includedKm: 220 },
    raigadFort: { price: 4499, includedKm: 260 },
    mahabaleshwarPanchgani: { price: 4999, includedKm: 300 },
    shirdiDarshan: { price: 5499, includedKm: 400 },
    nashikTrimbakeshwar: { price: 5499, includedKm: 420 },
  },
};
