import { pricingConfig } from '../config/pricingConfig.js';

/* ── Validation safeguards ─────────────────────────────────────────── */
function clampNonNegative(n, fallback = 0) {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[pricing] Invalid non-negative value: ${n}. Using ${fallback}.`);
    }
    return fallback;
  }
  return v;
}

export function formatINR(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

/* ── Core calculations ─────────────────────────────────────────────── */

export function calculateExtraDistanceCharge(actualKm, includedKm, extraKmRate) {
  const actual = clampNonNegative(actualKm);
  const included = clampNonNegative(includedKm);
  const rate = clampNonNegative(extraKmRate);
  const extraKm = Math.max(0, actual - included);
  return extraKm * rate;
}

export function calculateExtraKm(actualKm, includedKm) {
  return Math.max(0, clampNonNegative(actualKm) - clampNonNegative(includedKm));
}

export function calculateDiscountedPrice(basePrice, discount) {
  const base = clampNonNegative(basePrice);
  // Discount can never exceed the price or be negative.
  const d = Math.min(Math.max(0, Number(discount) || 0), base);
  return base - d;
}

export function calculateFinalPrice(basePrice, actualKm, includedKm, extraKmRate, discount = 0) {
  const base = clampNonNegative(basePrice);
  const extra = calculateExtraDistanceCharge(actualKm, includedKm, extraKmRate);
  return calculateDiscountedPrice(base + extra, discount);
}

/* ── Config-driven package pricing ─────────────────────────────────── */

export function getLaunchDiscount() {
  const offer = pricingConfig.ganpatiLaunchOffer;
  if (!offer || offer.enabled !== true) return 0;
  return clampNonNegative(offer.discountPerVehicle);
}

export function isLaunchOfferEnabled() {
  return pricingConfig.ganpatiLaunchOffer?.enabled === true;
}

/**
 * Resolve full pricing for a package key (e.g. "puneGanpatiCircuit").
 * Returns { regularPrice, launchPrice, includedKm, extraKmRate, enabled }.
 * Missing keys fall back to distance defaults instead of crashing.
 */
export function getPackagePricing(priceKey) {
  const entry = pricingConfig.packages?.[priceKey];
  const regularPrice = clampNonNegative(entry?.regularPrice);
  const includedKm = clampNonNegative(
    entry?.includedKm ?? pricingConfig.distance?.defaultIncludedKm ?? 200,
  );
  const extraKmRate = clampNonNegative(
    entry?.extraKmRate ?? pricingConfig.distance?.extraKmRate ?? 18,
  );
  const discount = getLaunchDiscount();
  return {
    regularPrice,
    launchPrice: calculateDiscountedPrice(regularPrice, discount),
    discount,
    includedKm,
    extraKmRate,
    enabled: entry?.enabled !== false,
  };
}

/** Display price: launch price when the offer is on, else regular price. */
export function getDisplayPrice(priceKey) {
  const p = getPackagePricing(priceKey);
  return isLaunchOfferEnabled() ? p.launchPrice : p.regularPrice;
}

/* ── General tour pricing (pricingConfig.tours) ────────────────────── */

/**
 * Resolve pricing for a general tour key (e.g. "lonavalaKhandala").
 * Returns { price: number|null, includedKm, extraKmRate }.
 * Tours WITHOUT a config entry return price: null → UI shows "Get a Quote".
 */
export function getTourPricing(priceKey) {
  const entry = priceKey ? pricingConfig.tours?.[priceKey] : undefined;
  if (!entry) {
    return {
      price: null,
      includedKm: clampNonNegative(pricingConfig.distance?.defaultIncludedKm ?? 200),
      extraKmRate: clampNonNegative(pricingConfig.distance?.extraKmRate ?? 18),
    };
  }
  return {
    price: clampNonNegative(entry.price),
    includedKm: clampNonNegative(
      entry.includedKm ?? pricingConfig.distance?.defaultIncludedKm ?? 200,
    ),
    extraKmRate: clampNonNegative(
      entry.extraKmRate ?? pricingConfig.distance?.extraKmRate ?? 18,
    ),
  };
}

/** "₹4,499 / vehicle" — null when the tour has no fixed price. */
export function formatPerVehicle(price) {
  if (price === null || price === undefined) return null;
  return `${formatINR(price)} / vehicle`;
}

export function distancePolicyText(includedKm, extraKmRate) {
  return `Package fare includes up to ${includedKm} km. Additional distance is charged at ${formatINR(extraKmRate)}/km.`;
}

/* ── Booking advance (reservation) ───────────────────────────────────
 * The advance reserves the vehicle for the selected date and is
 * adjusted against the final trip fare. It is NEVER added on top of
 * the package price:  Final Trip Fare = Package Price
 *                                        + Extra Distance Charges
 *                                        − applicable discount
 *                     Amount Remaining  = Final Trip Fare − advance.
 */

export function getBookingAdvance() {
  return clampNonNegative(pricingConfig.booking?.advanceAmount);
}

export function bookingAdvanceExplanation() {
  return `A ${formatINR(getBookingAdvance())} booking advance is required to reserve the vehicle for your selected date. This amount will be adjusted against your final trip fare.`;
}

export function bookingAdvanceShortText() {
  return `${formatINR(getBookingAdvance())} booking advance required to reserve`;
}

/**
 * Amount still payable once the final trip fare is known.
 * Only call/display this when the final fare is actually confirmed.
 */
export function calculateRemainingFare(finalTripFare) {
  return Math.max(0, clampNonNegative(finalTripFare) - getBookingAdvance());
}

/** Dev-time sanity checks: unique package IDs, sane numbers. */
export function validatePackages(packages) {
  if (process.env.NODE_ENV === 'production') return;
  const seen = new Set();
  (packages || []).forEach((p) => {
    if (!p.id) console.warn('[pricing] Package missing id:', p);
    if (seen.has(p.id)) console.warn(`[pricing] Duplicate package id: ${p.id}`);
    seen.add(p.id);
    const cfg = getPackagePricing(p.regularPriceKey);
    if (p.regularPriceKey && pricingConfig.packages?.[p.regularPriceKey] === undefined) {
      console.warn(`[pricing] No pricing entry for key: ${p.regularPriceKey}`);
    }
    if (cfg.regularPrice <= 0) console.warn(`[pricing] Non-positive price for: ${p.id}`);
  });
}
