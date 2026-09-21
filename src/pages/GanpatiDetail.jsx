import { Link, useParams } from 'react-router-dom';
import { MapPin, Users, Check, X, ArrowLeft, Clock, Route } from 'lucide-react';
import BookingForm from '../components/BookingForm.jsx';
import BookingAdvanceBox from '../components/BookingAdvanceBox.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { getGanpatiPackageBySlug, GANPATI_INCLUDED, GANPATI_EXCLUDED } from '../data/ganpatiPackages.js';
import { getPackagePricing, isLaunchOfferEnabled, formatINR, distancePolicyText, getBookingAdvance } from '../utils/pricing.js';
import { tourConfig } from '../config/tourConfig.js';
import { businessConfig } from '../config/businessConfig.js';
import NotFound from './NotFound.jsx';

export default function GanpatiDetail() {
  const { slug } = useParams();
  const pkg = getGanpatiPackageBySlug(slug);
  if (!pkg) return <NotFound />;

  const pricing = getPackagePricing(pkg.regularPriceKey);
  const showLaunch = isLaunchOfferEnabled();
  const displayPrice = showLaunch ? pricing.launchPrice : pricing.regularPrice;
  const tourName = `${pkg.name} (${pkg.temples.join(' + ')})`;
  const formPkg = {
    regularPrice: pricing.regularPrice,
    launchPrice: pricing.launchPrice,
    includedKm: pricing.includedKm,
    extraKmRate: pricing.extraKmRate,
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-12 sm:pt-32 text-white">
        <SafeImage src={pkg.image} alt={`${pkg.name} Ashtavinayak temple with Mirantar`} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" aria-hidden="true" />
        <div className="container-x relative">
          <Link to="/ganpati-special" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-200 hover:text-white"><ArrowLeft size={16} /> All Ganpati packages</Link>
          <p className="eyebrow !text-gold-200 mt-4">Ganpati Special 2026</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{pkg.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-white/85"><MapPin size={17} className="text-gold-200" />{pkg.temples.join(' + ')}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 font-semibold"><Clock size={14} /> {pkg.duration}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 font-semibold"><Users size={14} /> Up to {pkg.maxPassengers} passengers</span>
          </div>
          {pkg.tag && <p className="mt-3 inline-block rounded-full bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold-100">{pkg.tag}</p>}
        </div>
      </section>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div className="card p-6 sm:p-8 reveal">
            <h2 className="font-display text-2xl font-semibold text-navy">Per-Vehicle Pricing</h2>
            <div className="mt-4 space-y-2 rounded-2xl bg-cream p-5 text-sm sm:text-base">
              {showLaunch ? (
                <>
                  <div className="flex justify-between text-slate-500"><span>Regular Price</span><span className="line-through">{formatINR(pricing.regularPrice)} / vehicle</span></div>
                  <div className="flex justify-between font-bold text-navy"><span>Ganpati Launch Price</span><span>{formatINR(displayPrice)} / vehicle</span></div>
                </>
              ) : (
                <div className="flex justify-between font-bold text-navy"><span>Price</span><span>{formatINR(displayPrice)} / vehicle</span></div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-navy">
                <span className="inline-flex items-center gap-1.5"><Route size={15} className="text-gold-600" /> Distance Included</span>
                <span>Up to {pricing.includedKm} km</span>
              </div>
              <div className="flex justify-between text-slate-600"><span>Additional Distance</span><span className="font-semibold">{formatINR(pricing.extraKmRate)}/km</span></div>
              <div className="flex justify-between font-semibold text-navy"><span>Booking Advance</span><span>{formatINR(getBookingAdvance())}</span></div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">Booking advance is adjusted against the final trip fare — it is not an additional charge.</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {distancePolicyText(pricing.includedKm, pricing.extraKmRate)} Additional distance beyond the included limit is charged separately.
              Measured on the vehicle&apos;s total journey from its base in {businessConfig.baseLocation.city}.
            </p>
            <p className="mt-2">{pkg.description}</p>
            {pkg.climbWarning && (
              <p className="mt-3 rounded-xl bg-gold-50 border border-gold/40 p-3 text-sm font-medium text-navy">{pkg.climbWarning}</p>
            )}
            <h3 className="mt-5 font-semibold text-navy">Route</h3>
            <p className="mt-1 text-sm text-slate-600">{pkg.route.join(' → ')}</p>
            <h3 className="mt-4 font-semibold text-navy">Highlights</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              {pkg.highlights.map((h) => <li key={h} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-gold-600" />{h}</li>)}
            </ul>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-navy">Included</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {GANPATI_INCLUDED.map((li) => <li key={li} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-green-600" />{li}</li>)}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-navy">Not Included</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {GANPATI_EXCLUDED.map((li) => <li key={li} className="flex gap-2"><X size={15} className="mt-0.5 shrink-0 text-red-500" />{li}</li>)}
              </ul>
            </div>
          </div>
          <BookingAdvanceBox />
          <p className="rounded-2xl border border-gold/40 bg-gold-50 p-4 text-sm leading-relaxed text-navy">{tourConfig.fareNote}</p>
        </div>
        <div className="lg:sticky lg:top-24 h-fit"><BookingForm presetTour={tourName} ganpatiPkg={formPkg} /></div>
      </div>
    </>
  );
}
