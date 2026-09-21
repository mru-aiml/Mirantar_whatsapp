/*
 * MIRANTAR BUSINESS CONTROL PANEL — contact & identity
 * ----------------------------------------------------
 * Change the phone / WhatsApp number HERE ONLY.
 * Every navbar, footer, call button, WhatsApp button, booking form,
 * contact page and CTA reads from this file. Do NOT hard-code the
 * number inside individual components.
 *
 * HOW TO CHANGE THE NUMBER:
 *   1. Put the new number below in `phone` and `whatsapp`
 *      (digits only, with country code, e.g. "919876543210").
 *   2. Rebuild / redeploy. Done — the whole site follows.
 */

export const businessConfig = {
  name: 'MIRANTAR',
  tagline: 'MOVING FORWARD. ALWAYS.',
  city: 'Pune, Maharashtra',
  website: 'www.mirantar.com',

  // TODO: replace with the real Mirantar number (digits only, with country code).
  phone: '+91 99753 42803',
  whatsapp: '+91 99753 42803',

  // Default pre-filled text for generic "Chat / Ask on WhatsApp" buttons.
  whatsappMessage: 'Hello Mirantar, I would like to enquire about a tour.',

  // Vehicle base — included kilometres are measured on the vehicle's total
  // journey starting from this base location.
  baseLocation: {
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
  },

  vehicle: {
    name: 'Maruti Suzuki Ertiga Smart Hybrid',
    capacity: 6,
  },

  logoPath: '/images/logo/mirantar-logo.png',
};

/* Backwards-compatible derived values (prefer the helpers in utils/whatsapp.js). */
export const SITE_COMPAT = {
  name: businessConfig.name,
  tagline: businessConfig.tagline,
  website: businessConfig.website,
  city: businessConfig.city,
  vehicle: `${businessConfig.vehicle.name} (Petrol + Electric)`,
  capacity: businessConfig.vehicle.capacity,
  logoPath: businessConfig.logoPath,
};
