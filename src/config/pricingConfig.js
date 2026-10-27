/*
 * MIRANTAR PRICING CONTROL PANEL
 */

export const pricingConfig = {
  currency: 'INR',

  booking: {
    advanceAmount: 500,
  },

  festiveOffer: {
    enabled: true,
    code: 'FESTIVE500',
    discountAmount: 500,
    // Minimum regular fare threshold (strictly greater than): a trip must cost
    // MORE than this amount to qualify. A fare of exactly ₹3,500 is NOT eligible.
    minRegularFare: 3500,
    // Eligible trip types: outstation round-trips AND one-way outstation transfers.
    // 'local' tripType is NOT in this list — local packages are excluded.
    // Airport transfers are also excluded (handled separately).
    eligibleTripTypes: ['outstation', 'outstation one-way'],
    // ⚠️  FRONTEND LIMITATION: maxConfirmedBookings cannot be enforced in this
    // static frontend. Bookings arrive via WhatsApp and are confirmed manually.
    // The owner must track the count and set enabled: false after 10 confirmed
    // bookings. See utils/pricing.js getFestiveMaxConfirmedBookings() for details.
    // Recommended backend: Firebase Firestore with a campaign counter document.
    maxConfirmedBookings: 10,
    allowCombination: false,
    label: 'Mirantar Festive Getaways',
  },

  airportTransfer: {
    startingPrice: 799,
    currency: 'INR',
  },

  extraHourRate: 300,

  distance: {
    defaultIncludedKm: 200,
    extraKmRate: 15,
  },

  packages: {
    puneGanpatiCircuit: { regularPrice: 3999, includedKm: 180, extraKmRate: 15, enabled: true },
    vighnahartaYatra: { regularPrice: 4999, includedKm: 260, extraKmRate: 15, enabled: true },
    moryaDarshan: { regularPrice: 4499, includedKm: 250, extraKmRate: 15, enabled: true },
    konkanGanpatiYatra: { regularPrice: 6499, includedKm: 300, extraKmRate: 15, enabled: true },
    mahaAshtavinayakDayYatra: { regularPrice: 8499, includedKm: 350, extraKmRate: 15, enabled: true },
  },

  tours: {
    // Local packages
    halfDayLocal: { price: 1949, includedKm: 60, includedHours: 6, extraKmRate: 15, tripType: 'local', enabled: true },
    fullDayLocal: { price: 2449, includedKm: 120, includedHours: 8, extraKmRate: 15, tripType: 'local', enabled: true },
    extendedLocal: { price: 3399, includedKm: 250, includedHours: 12, extraKmRate: 15, tripType: 'local', enabled: true },

    // Outstation routes
    puneMumbaiOneWay: { price: 3149, includedKm: 0, extraKmRate: 15, tripType: 'outstation one-way', oneWay: true, enabled: true },
    puneMumbaiRoundTrip: { price: 4849, includedKm: 300, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneLonavala: { price: 4399, includedKm: 300, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneBhimashankar: { price: 4399, includedKm: 300, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneMahabaleshwar: { price: 4899, includedKm: 300, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneShirdi: { price: 5849, includedKm: 400, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneGoa: { price: 14499, includedKm: 1000, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneTrimbakeshwar: { price: 7349, includedKm: 500, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneTuljapur: { price: 8399, includedKm: 600, extraKmRate: 15, tripType: 'outstation', enabled: true },
    punePandharpur: { price: 7349, includedKm: 500, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneAkkalkot: { price: 9099, includedKm: 650, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneSolapur: { price: 7349, includedKm: 500, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneKolhapur: { price: 7349, includedKm: 500, extraKmRate: 15, tripType: 'outstation', enabled: true },
    puneSatara: { price: 4399, includedKm: 300, extraKmRate: 15, tripType: 'outstation', enabled: true },

    // Existing non-sheet tours retained with prior configured prices
    puneHeritage: { price: 2499, includedKm: 80, extraKmRate: 15, tripType: 'local', enabled: true },
    sinhagadKhadakwasla: { price: 2499, includedKm: 100, extraKmRate: 15, tripType: 'outstation', enabled: true },
    mulshiTamhini: { price: 3499, includedKm: 150, extraKmRate: 15, tripType: 'outstation', enabled: true },
    jejuriDarshan: { price: 2999, includedKm: 130, extraKmRate: 15, tripType: 'outstation', enabled: true },
    bhuleshwarJejuri: { price: 3299, includedKm: 150, extraKmRate: 15, tripType: 'outstation', enabled: true },
    raigadFort: { price: 4499, includedKm: 260, extraKmRate: 15, tripType: 'outstation', enabled: true },
    matheran: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
    bhandardara: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
    pratapgad: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
    shivneri: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
    ajantaEllora: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
    alandiDehu: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'local', enabled: true },
    ashtavinayak: { price: null, includedKm: 200, extraKmRate: 15, tripType: 'outstation', enabled: true },
  },
};
