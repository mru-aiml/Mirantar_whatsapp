/*
 * CENTRAL IMAGE CONFIGURATION
 * ────────────────────────────
 * Every image in the app resolves through this file.
 *
 * TO REPLACE A PHOTO: drop the real photo into the matching folder
 * under public/images/ and update ONLY the path below. Do NOT touch
 * any component.
 *
 * Folders:
 *   public/images/logo/          brand logo
 *   public/images/hero/          homepage / page heroes
 *   public/images/tours/         one file per tour (provided tour photos)
 *   public/images/ashtavinayak/  branded SVG placeholders, one per temple
 *                                (theur, ranjangaon, ozar, lenyadri,
 *                                morgaon, siddhatek, pali, mahad)
 *                                TODO: replace with real temple photos.
 *   public/images/vehicle/       actual Ertiga photos (when available)
 *   public/images/destinations/  neutral fallback placeholder
 *
 * Provided tour photos (verified against their destinations) live in
 * public/images/tours/. Filenames match the owner's originals, e.g.
 * "ashthavinayak.jpg" keeps the owner's spelling.
 *
 * KNOWN TODOs (owner-provided assets, kept as-is — do not silently swap):
 * - tours/pune_heritage.jpg and tours/jejuri.jpg carry a stock-agency
 *   watermark. Replace with clean licensed copies when available.
 * - tours/shirdi.jpg is low resolution (7 KB). Replace with a
 *   higher-resolution photo when available.
 * - tours/alandi.jpg could not be conclusively verified as Alandi.
 *   Owner to confirm it shows the Indrayani riverside temples.
 */

export const logoImage = '/images/logo/mirantar-logo.png';

export const heroImages = {
  home: '/images/hero/pune-ghats.jpg',
  homeAlt: 'Monsoon Sahyadri ghats near Pune, Maharashtra',
};

export const vehicleImages = {
  ertiga: '/images/vehicle/ertiga.avif',
  ertigaAlt: 'Mirantar Maruti Suzuki Ertiga Smart Hybrid',
};

export const destinationImages = {
  theur: '/images/ashtavinayak/theur.svg',
  ranjangaon: '/images/ashtavinayak/ranjangaon.svg',
  ozar: '/images/ashtavinayak/ozar.svg',
  lenyadri: '/images/ashtavinayak/lenyadri.svg',
  morgaon: '/images/ashtavinayak/morgaon.svg',
  siddhatek: '/images/ashtavinayak/siddhatek.svg',
  pali: '/images/ashtavinayak/pali.svg',
  mahad: '/images/ashtavinayak/mahad.svg',
};

export const tourImages = {
  bhimashankar: '/images/tours/bhimashankar.jpg',
  lonavala: '/images/tours/lonavala.jpg',
  mahabaleshwar: '/images/tours/mahabaleshwar.avif',
  shirdi: '/images/tours/shirdi.jpg',
  jejuri: '/images/tours/jejuri.jpg',
  raigad: '/images/tours/raigad.jpg',
  mulshi: '/images/tours/mulshi.jpg',
  nashik: '/images/tours/nashik.jpg',
  alandi: '/images/tours/alandi.jpg',
  matheran: '/images/tours/matheran.jpg',
  bhandardara: '/images/tours/bhandardara.jpg',
  sinhagad: '/images/tours/sinhagad.jpg',
  pratapgad: '/images/tours/pratapgad.jpg',
  shivneri: '/images/tours/shivneri.jpg',
  ajanta: '/images/tours/ajanta.jpg',
  ashtavinayak: '/images/tours/ashthavinayak.jpg',
  puneHeritage: '/images/tours/pune_heritage.jpg',
  custom: '/images/tours/custom.jpg',
  ganpati: '/images/tours/ganpati.jpg',
};

/** Meaningful alt text per tour image (SEO / accessibility). */
export const tourImageAlts = {
  bhimashankar: 'Bhimashankar Jyotirlinga temple with Mirantar',
  lonavala: 'Lonavala and Khandala monsoon valley trip',
  mahabaleshwar: 'Mahabaleshwar and Panchgani hill trip',
  shirdi: 'Shirdi Sai Baba darshan tour',
  jejuri: 'Jejuri Khandoba temple darshan',
  raigad: 'Raigad Fort heritage tour',
  mulshi: 'Mulshi and Tamhini lake drive',
  nashik: 'Nashik and Trimbakeshwar yatra',
  alandi: 'Alandi and Dehu temple town tour',
  matheran: 'Matheran hill station day trip',
  bhandardara: 'Bhandardara waterfalls and lake tour',
  sinhagad: 'Sinhagad fort tour with Mirantar',
  pratapgad: 'Pratapgad fort heritage tour',
  shivneri: 'Shivneri fort, birthplace of Chhatrapati Shivaji Maharaj',
  ajanta: 'Ajanta and Ellora cave temples tour',
  ashtavinayak: 'Ashtavinayak Ganpati temple yatra',
  puneHeritage: 'Pune Heritage Tour with Mirantar',
  custom: 'Custom road trip from Pune',
  ganpati: 'Ashtavinayak Morya Darshan with Mirantar',
};

/** Neutral branded fallback shown if any image fails to load. */
export const FALLBACK_IMAGE = '/images/destinations/placeholder.svg';

/* Backwards-compatible export (existing components keep working). */
export const IMAGES = {
  logo: logoImage,
  hero: heroImages.home,
  heroAlt: heroImages.homeAlt,
  vehiclePlaceholder: vehicleImages.ertiga,
  tours: tourImages,
};
