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
  return 0;
}

export function isLaunchOfferEnabled() {
  return false;
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
  return {
    regularPrice,
    includedKm,
    extraKmRate,
    enabled: entry?.enabled !== false,
  };
}

/** Display price for a Ganpati package. */
export function getDisplayPrice(priceKey) {
  return getPackagePricing(priceKey).regularPrice;
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
      extraKmRate: clampNonNegative(pricingConfig.distance?.extraKmRate ?? 15),
      tripType: 'outstation',
      includedHours: null,
      oneWay: false,
    };
  }
  return {
    price: entry.price === null || entry.price === undefined ? null : clampNonNegative(entry.price),
    includedKm: clampNonNegative(
      entry.includedKm ?? pricingConfig.distance?.defaultIncludedKm ?? 200,
    ),
    extraKmRate: clampNonNegative(
      entry.extraKmRate ?? pricingConfig.distance?.extraKmRate ?? 15,
    ),
    tripType: entry.tripType || 'outstation',
    includedHours: entry.includedHours ?? null,
    oneWay: entry.oneWay === true,
  };
}

export function isFestiveTripTypeEligible(tripType) {
  const allowed = pricingConfig.festiveOffer?.eligibleTripTypes || [];
  return allowed.includes(tripType);
}

export function isFestiveEligibleOffer(price, tripType) {
  if (!isFestiveOfferEnabled()) return false;
  if (price === null || price === undefined) return false;
  // minRegularFare is 0 in config (no minimum fare requirement);
  // only the tripType gate applies for local vs outstation distinction.
  if (!isFestiveTripTypeEligible(tripType)) return false;
  return true;
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

/* ?"? Festive offer helpers ?"? */

export function getFestiveOfferConfig() {
  return pricingConfig.festiveOffer || {};
}

export function isFestiveOfferEnabled() {
  return pricingConfig.festiveOffer?.enabled === true;
}

export function getFestiveOfferCode() {
  return pricingConfig.festiveOffer?.code || 'FESTIVE500';
}

export function getFestiveDiscountAmount() {
  return clampNonNegative(pricingConfig.festiveOffer?.discountAmount ?? 500);
}

export function getFestiveMinRegularFare() {
  // Returns 0 when config sets minRegularFare: 0 (no minimum fare requirement).
  // Fallback is also 0 to reflect the same intent if the field is absent.
  return clampNonNegative(pricingConfig.festiveOffer?.minRegularFare ?? 0);
}

/**
 * Maximum number of confirmed bookings for the festive campaign.
 * ⚠️  FRONTEND LIMITATION: This value is read from config and displayed in
 * the UI, but it CANNOT be securely enforced in a frontend-only app.
 * The booking flow uses WhatsApp; there is no server or database counting
 * confirmed bookings in real time. The business owner must track the count
 * manually and disable the offer (set enabled: false in pricingConfig.js)
 * once 10 bookings are confirmed.
 *
 * For reliable automated enforcement, add a lightweight backend:
 *   Recommended: Firebase Firestore — one document per campaign, increment
 *   a counter on each confirmed booking, disable the offer when count >= max.
 */
export function getFestiveMaxConfirmedBookings() {
  return clampNonNegative(pricingConfig.festiveOffer?.maxConfirmedBookings ?? 10);
}

export function isFestiveCombinationAllowed() {
  return pricingConfig.festiveOffer?.allowCombination === true;
}

export function getAirportTransferStartingPrice() {
  return clampNonNegative(pricingConfig.airportTransfer?.startingPrice ?? 799);
}

export function getExtraHourRate() {
  const v = pricingConfig.extraHourRate;
  if (v === null || v === undefined) return null;
  return clampNonNegative(v);
}

export function isFestiveEligibleRegularPrice(regularPrice) {
  return clampNonNegative(regularPrice) >= getFestiveMinRegularFare();
}

export function calculateFestivePrice(regularPrice) {
  const base = clampNonNegative(regularPrice);
  if (!isFestiveOfferEnabled()) return base;
  if (!isFestiveEligibleRegularPrice(base)) return base;
  return calculateDiscountedPrice(base, getFestiveDiscountAmount());
}

export function festiveSavings(regularPrice) {
  if (!isFestiveOfferEnabled()) return 0;
  if (!isFestiveEligibleRegularPrice(regularPrice)) return 0;
  return getFestiveDiscountAmount();
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
