import { tourImages } from './images.js';
import { validatePackages } from '../utils/pricing.js';

/*
 * CENTRAL GANPATI / ASHTAVINAYAK PACKAGE DATA
 * ────────────────────────────────────────────
 * Single source of truth for fixed packages. Prices, included km and
 * extra-km rates are NOT stored here — they resolve from
 * src/config/pricingConfig.js via `regularPriceKey` (see utils/pricing.js).
 *
 * To add a photo later, drop the real temple photo into
 * public/images/ashtavinayak/ and update src/data/images.js only.
 */

export const GANPATI_CATEGORY = 'Ashtavinayak';

export const ganpatiPackages = [
  {
    id: 'pune-ganpati-circuit',
    slug: 'pune-ganpati-circuit',
    name: 'Pune Ganpati Circuit',
    temples: ['Theur', 'Ranjangaon'],
    category: GANPATI_CATEGORY,
    duration: 'One Day',
    maxPassengers: 6,
    regularPriceKey: 'puneGanpatiCircuit',
    route: ['Pune', 'Theur', 'Ranjangaon', 'Pune'],
    description:
      'The two Ashtavinayak temples closest to Pune — Chintamani at Theur and Mahaganapati at Ranjangaon — in one relaxed private day yatra from Pune with a professional driver.',
    // TODO: replace with real Theur / Ranjangaon temple photos (see src/data/images.js).
    image: tourImages.ashtavinayak,
    highlights: [
      'Chintamani darshan at Theur',
      'Mahaganapati darshan at Ranjangaon',
      'Private Ertiga',
      'Professional driver',
    ],
  },
  {
    id: 'vighnaharta-yatra',
    slug: 'vighnaharta-yatra',
    name: 'Vighnaharta Yatra',
    temples: ['Lenyadri', 'Ozar'],
    category: GANPATI_CATEGORY,
    duration: 'One Day',
    maxPassengers: 6,
    regularPriceKey: 'vighnahartaYatra',
    route: ['Pune', 'Lenyadri', 'Ozar', 'Pune'],
    description:
      'Girijatmaj at Lenyadri and Vighneshwar at Ozar. Lenyadri involves a significant climb and requires comfortable footwear and water.',
    // TODO: replace with real Lenyadri / Ozar photos (see src/data/images.js).
    image: tourImages.ashtavinayak,
    highlights: [
      'Girijatmaj darshan at Lenyadri',
      'Vighneshwar darshan at Ozar',
      'Private Ertiga',
      'Professional driver',
    ],
    climbWarning:
      'Lenyadri involves a significant climb and requires comfortable footwear and water.',
  },
  {
    id: 'morya-darshan',
    slug: 'morya-darshan',
    name: 'Morya Darshan',
    temples: ['Morgaon', 'Siddhatek'],
    category: GANPATI_CATEGORY,
    duration: 'One Day',
    maxPassengers: 6,
    regularPriceKey: 'moryaDarshan',
    route: ['Pune', 'Morgaon', 'Siddhatek', 'Pune'],
    description:
      'Mayureshwar at Morgaon — the first (adya) of the Ashtavinayak temples — combined with Siddhivinayak at Siddhatek on the Bhima river.',
    // TODO: replace with real Morgaon / Siddhatek temple photos (see src/data/images.js).
    image: tourImages.ashtavinayak,
    highlights: [
      'Mayureshwar darshan at Morgaon',
      'Siddhivinayak darshan at Siddhatek',
      'Private Ertiga',
      'Professional driver',
    ],
  },
  {
    id: 'konkan-ganpati-yatra',
    slug: 'konkan-ganpati-yatra',
    name: 'Konkan Ganpati Yatra',
    temples: ['Pali', 'Mahad'],
    category: GANPATI_CATEGORY,
    duration: 'One Day',
    maxPassengers: 6,
    regularPriceKey: 'konkanGanpatiYatra',
    route: ['Pune', 'Pali', 'Mahad', 'Pune'],
    description:
      'Ballaleshwar at Pali and Varadvinayak at Mahad — the Konkan-side Ashtavinayak temples, reached via a scenic ghat descent from Pune.',
    // TODO: replace with real Pali / Mahad temple photos (see src/data/images.js).
    image: tourImages.ashtavinayak,
    highlights: [
      'Ballaleshwar darshan at Pali',
      'Varadvinayak darshan at Mahad',
      'Private Ertiga',
      'Professional driver',
    ],
  },
  {
    id: 'maha-ashtavinayak-day-yatra',
    slug: 'maha-ashtavinayak-day-yatra',
    name: 'Maha Ashtavinayak Day Yatra',
    temples: ['Theur', 'Ranjangaon', 'Morgaon', 'Siddhatek'],
    category: GANPATI_CATEGORY,
    duration: 'One Day (long day)',
    maxPassengers: 6,
    regularPriceKey: 'mahaAshtavinayakDayYatra',
    route: ['Pune', 'Theur', 'Ranjangaon', 'Morgaon', 'Siddhatek', 'Pune'],
    tag: 'Long-day private pilgrimage tour',
    description:
      'A long-day private pilgrimage covering four Ashtavinayak temples. Please note: all 8 Ashtavinayak temples cannot comfortably be completed in one day.',
    // TODO: replace with a real Ashtavinayak route photo (see src/data/images.js).
    image: tourImages.ashtavinayak,
    highlights: [
      'Four-temple darshan in a single long day',
      'Theur, Ranjangaon, Morgaon, Siddhatek',
      'Private Ertiga',
      'Professional driver',
    ],
  },
];

validatePackages(ganpatiPackages);

export function getGanpatiPackageBySlug(slug) {
  return ganpatiPackages.find((p) => p.slug === slug || p.id === slug);
}

export const GANPATI_INCLUDED = [
  'Maruti Suzuki Ertiga Smart Hybrid',
  'Fuel',
  'Professional driver',
  'Private vehicle',
  'Pune pickup/drop within defined service area',
];

export const GANPATI_EXCLUDED = [
  'Toll charges',
  'Parking charges',
  'Halting/night-stay charges',
  'Food and refreshments',
  'Personal expenses',
  'Optional charges, where applicable',
];
