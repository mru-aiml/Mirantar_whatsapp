import { businessConfig } from '../config/businessConfig.js';
import { tourConfig } from '../config/tourConfig.js';

/*
 * Backwards-compatible SITE object — the single source of truth is
 * src/config/businessConfig.js. No phone numbers are hard-coded here.
 * (Previous release used a hard-coded number; now centralised.)
 */
export const SITE = {
  name: businessConfig.name,
  tagline: businessConfig.tagline,
  phoneDisplay: businessConfig.phone,
  phoneIntl: businessConfig.phone,
  whatsappNumber: businessConfig.whatsapp,
  whatsappUrl: `https://wa.me/${businessConfig.whatsapp}`,
  website: businessConfig.website,
  city: businessConfig.city,
  vehicle: `${businessConfig.vehicle.name} (Petrol + Electric)`,
  capacity: businessConfig.vehicle.capacity,
  logoPath: businessConfig.logoPath,
};

export const WHATSAPP_NUMBER = SITE.whatsappNumber;

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/ganpati-special', label: 'Ganpati Special' },
  { to: '/vehicle', label: 'Our Vehicle' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const FARE_NOTE = tourConfig.fareNote;
