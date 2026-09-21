import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Map } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import TourGrid from '../components/TourGrid.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import { TOURS, TOUR_CATEGORIES } from '../data/tours.js';
import { IMAGES } from '../data/images.js';

export default function Tours() {
  const [params] = useSearchParams();
  const initial = params.get('cat') || 'All';
  const [cat, setCat] = useState(initial);
  const filtered = useMemo(() => (cat === 'All' ? TOURS : TOURS.filter((t) => t.category === cat)), [cat]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 sm:pb-16 text-white">
        <img src={IMAGES.tours.mahabaleshwar} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Tours from Pune</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Maharashtra Tours</h1>
          <p className="mt-3 max-w-2xl text-white/75">Private one-day and multi-day tours in a comfortable Ertiga with a professional driver. Prices without a fixed fare show “Get a Quote” — message us on WhatsApp for a per-vehicle quotation.</p>
        </div>
      </section>

      <div className="container-x py-12 sm:py-16 flex flex-col gap-12">
        <div className="flex flex-wrap gap-2 reveal" role="tablist" aria-label="Tour categories">
          {['All', ...TOUR_CATEGORIES].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${cat === c ? 'bg-navy text-white shadow-soft' : 'bg-white text-navy border border-slate-200 hover:border-navy'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {['All', 'Religious & Spiritual', 'Hill Stations & Nature', 'Heritage & Forts'].includes(cat) && (
          <section aria-label={`${cat} tours`}>
            <SectionHeader align="left" eyebrow={cat === 'All' ? 'All tours' : cat} title={cat === 'All' ? `All Tours (${filtered.length})` : `${cat} (${filtered.length})`} />
            <div className="mt-6"><TourGrid tours={filtered} /></div>
          </section>
        )}
        {(cat === 'All' || cat === 'Custom Trips') && (
          <section className="card flex flex-col sm:flex-row items-stretch gap-0 reveal" aria-label="Custom trips">
            <img src={IMAGES.tours.custom} alt="Custom road trip" loading="lazy" className="sm:w-2/5 object-cover min-h-[220px]" />
            <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
              <p className="eyebrow">Custom Trips</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Your destination. Your itinerary.</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Offbeat village, wedding in another city, multi-day Konkan loop — tell us the plan and we&apos;ll quote a per-vehicle fare.</p>
              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <Link to="/custom-trip" className="btn-gold"><Map size={17} /> Plan a Custom Trip</Link>
                <Link to="/ganpati-special" className="btn-outline-navy">Ganpati Special 2026</Link>
              </div>
            </div>
          </section>
        )}
        <WhatsAppCTA compact title="Not sure which tour fits?" sub="Message us — we'll help you choose" />
      </div>
    </>
  );
}
