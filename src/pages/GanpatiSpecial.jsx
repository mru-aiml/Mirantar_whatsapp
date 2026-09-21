import { Link } from 'react-router-dom';
import { BadgePercent, Check, X, MessageCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import PackageCard from '../components/PackageCard.jsx';
import FAQ from '../components/FAQ.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import BookingSteps from '../components/BookingSteps.jsx';
import BookingAdvanceBox from '../components/BookingAdvanceBox.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { GANPATI_PACKAGES, GANPATI_INCLUDED, GANPATI_EXCLUDED } from '../data/ganpati.js';
import { FARE_NOTE } from '../data/site.js';
import { tourImages } from '../data/images.js';
import { pricingConfig } from '../config/pricingConfig.js';
import { tourConfig } from '../config/tourConfig.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function GanpatiSpecial() {
  usePageMeta({
    title: 'Ashtavinayak Yatra from Pune | Mirantar',
    description:
      'Private Ashtavinayak Yatra packages from Pune in a comfortable Ertiga with professional driver. Transparent per-vehicle pricing.',
    ogTitle: 'Ashtavinayak Yatra from Pune | Mirantar',
    ogDescription:
      'Private Ashtavinayak Yatra packages from Pune in a comfortable Ertiga with professional driver. Transparent per-vehicle pricing.',
  });

  const offer = pricingConfig.ganpatiLaunchOffer;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 sm:pb-20 text-white">
        <SafeImage src={tourImages.ganpati} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/65 via-navy-950/70 to-navy-950" aria-hidden="true" />
        <div className="container-x relative max-w-4xl text-center mx-auto">
          <p className="eyebrow !text-gold-200 justify-center">Ganpati Special 2026 · Private Ashtavinayak Yatras</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold leading-tight">Begin Your Ashtavinayak Yatra</h1>
          <p className="mt-3 text-base sm:text-lg text-white/85">Private Ashtavinayak journeys from Pune with Mirantar.</p>
          {offer?.enabled && (
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-950">
                <BadgePercent size={17} /> {offer.label || 'Ganpati Launch Offer'}: Save ₹{Number(offer.discountPerVehicle).toLocaleString('en-IN')} per vehicle
              </span>
            </div>
          )}
          <p className="mt-3 text-xs text-white/60">Prices are per vehicle, for up to 6 passengers.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <a href="#packages" className="btn-gold">View Packages</a>
            <a href={createWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle size={17} /> Ask on WhatsApp</a>
          </div>
        </div>
      </section>

      <div className="container-x py-12 sm:py-16 flex flex-col gap-14">
        <section id="packages" aria-label="Ashtavinayak packages" className="scroll-mt-28">
          <SectionHeader eyebrow="Fixed per-vehicle pricing" title="Ashtavinayak Packages" sub="All fares are per vehicle (up to 6 passengers) — not per person. Toll, parking and halting are payable separately." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {GANPATI_PACKAGES.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2" aria-label="Package inclusions">
          <div className="card p-6 sm:p-8 reveal">
            <h2 className="font-display text-2xl font-semibold text-navy">Included</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {GANPATI_INCLUDED.map((li) => (
                <li key={li} className="flex items-start gap-2.5"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={13} /></span>{li}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6 sm:p-8 reveal">
            <h2 className="font-display text-2xl font-semibold text-navy">Not Included</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {GANPATI_EXCLUDED.map((li) => (
                <li key={li} className="flex items-start gap-2.5"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600"><X size={13} /></span>{li}</li>
              ))}
            </ul>
          </div>
        </section>
        <div className="mx-auto max-w-3xl rounded-2xl bg-gold-50 border border-gold/40 p-5 text-center text-sm leading-relaxed text-navy reveal">
          <p>{FARE_NOTE}</p>
          <p className="mt-2 text-xs text-slate-600">{tourConfig.distanceNote}</p>
        </div>

        <div className="mx-auto w-full max-w-3xl"><BookingAdvanceBox /></div>

        <BookingSteps />

        <section aria-label="Frequently asked questions">
          <SectionHeader eyebrow="FAQ" title="Ashtavinayak Questions" />
          <div className="mt-8"><FAQ /></div>
        </section>

        <WhatsAppCTA title="Ready to book your yatra?" sub={offer?.enabled ? `${offer.label || 'Ganpati Launch Offer'} · Save ₹${Number(offer.discountPerVehicle).toLocaleString('en-IN')} per vehicle` : 'MIRANTAR — MOVING FORWARD. ALWAYS.'} />
        <p className="text-center text-sm text-slate-500">Prefer a different combination? <Link to="/custom-trip" className="font-semibold text-gold-600 underline">Get a custom quote</Link>.</p>
      </div>
    </>
  );
}
