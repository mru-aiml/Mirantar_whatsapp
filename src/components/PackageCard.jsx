import { Link } from 'react-router-dom';
import { Users, MapPin, MessageCircle, ArrowRight, Clock, Route } from 'lucide-react';
import { formatINR, isLaunchOfferEnabled, distancePolicyText } from '../data/ganpati.js';
import { getBookingAdvance, bookingAdvanceShortText } from '../utils/pricing.js';
import { tourImages } from '../data/images.js';
import SafeImage from './SafeImage.jsx';
import { businessConfig } from '../config/businessConfig.js';

/*
 * Fixed-package card. All fares resolve from pricingConfig —
 * nothing is hard-coded here. Shows distance policy transparently.
 */
export default function PackageCard({ pkg }) {
  const showLaunch = isLaunchOfferEnabled();
  const displayPrice = showLaunch ? pkg.launchPrice : pkg.regularPrice;

  return (
    <article className="card card-hover img-zoom flex flex-col reveal">
      <div className="relative aspect-[16/9] overflow-hidden">
        <SafeImage src={tourImages.ashtavinayak} alt={`${pkg.name} Ashtavinayak temple with Mirantar`} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="bg-navy p-5 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-200">Ganpati Special 2026</p>
        <h3 className="mt-1 font-display text-2xl font-semibold">{pkg.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80"><MapPin size={14} className="text-gold-200" />{pkg.temples}</p>
        {pkg.tag && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-100">
            <Clock size={13} /> {pkg.tag}
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="rounded-xl bg-cream p-4 text-sm">
          {showLaunch ? (
            <>
              <div className="flex justify-between text-slate-500">
                <span>Regular Price</span>
                <span className="line-through">{formatINR(pkg.regularPrice)} / vehicle</span>
              </div>
              <div className="mt-1.5 flex justify-between text-xl font-bold text-navy">
                <span>Ganpati Launch Price</span>
                <span>{formatINR(displayPrice)} / vehicle</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-xl font-bold text-navy">
              <span>Price</span>
              <span>{formatINR(displayPrice)} / vehicle</span>
            </div>
          )}
          <div className="mt-3 border-t border-slate-200 pt-3 space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-navy">
              <span className="inline-flex items-center gap-1.5"><Route size={14} className="text-gold-600" /> Distance Included</span>
              <span>Up to {pkg.includedKm} km</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Additional Distance</span>
              <span className="font-semibold">{formatINR(pkg.extraKmRate)}/km</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-navy">
              <span>Booking Advance</span>
              <span>{formatINR(getBookingAdvance())}</span>
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-500">Booking advance is adjusted against the final trip fare — it is not an additional charge.</p>
        <details className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs leading-relaxed text-slate-600">
          <summary className="cursor-pointer font-semibold text-navy">How the distance limit works</summary>
          <p className="mt-2">{distancePolicyText(pkg.includedKm, pkg.extraKmRate)}</p>
          <p className="mt-1.5">Measured on the vehicle&apos;s total journey from its base in {businessConfig.baseLocation.city}. Actual distance beyond the included limit is charged separately.</p>
        </details>
        <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><Users size={14} className="text-gold-600" />{pkg.capacity}</p>
        <p className="text-sm leading-relaxed text-slate-600">{pkg.note}</p>
        <p className="text-xs font-semibold text-gold-600">{bookingAdvanceShortText()}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Link to={`/ganpati-special/${pkg.slug}#book`} className="btn-outline-navy flex-1 !px-4 !py-2.5 text-sm">View <ArrowRight size={15} /></Link>
          <Link to={`/ganpati-special/${pkg.slug}#book`} className="btn-navy flex-1 !px-4 !py-2.5 text-sm"><MessageCircle size={15} /> Book</Link>
        </div>
      </div>
    </article>
  );
}
