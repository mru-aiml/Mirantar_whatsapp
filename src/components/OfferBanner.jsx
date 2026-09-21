import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { pricingConfig } from '../config/pricingConfig.js';
import { tourImages } from '../data/images.js';
import SafeImage from './SafeImage.jsx';

export default function OfferBanner() {
  const offer = pricingConfig.ganpatiLaunchOffer;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-800 to-navy-950 text-white reveal" aria-label="Ganpati Special 2026 offer">
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
      <div className="grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow !text-gold-200"><Sparkles size={14} /> Ganpati Special 2026</p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold leading-tight">Ganpati Bappa Morya!</h2>
          <p className="mt-2 text-lg text-white/85">Ashtavinayak Yatras from Pune</p>
          {offer?.enabled && (
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-gold px-4 py-1.5 font-bold text-navy-950">
                {offer.label || 'Ganpati Launch Offer'}: Save ₹{Number(offer.discountPerVehicle).toLocaleString('en-IN')} per vehicle
              </span>
            </div>
          )}
          <div className="mt-6">
            <Link to="/ganpati-special" className="btn-gold">Explore Ganpati Yatras <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="img-zoom overflow-hidden rounded-2xl">
          <SafeImage src={tourImages.ganpati} alt="Ashtavinayak Morya Darshan with Mirantar" loading="lazy" className="aspect-[3/2] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
