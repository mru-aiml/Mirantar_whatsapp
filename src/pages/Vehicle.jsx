import { Link } from 'react-router-dom';
import { Check, Users, Snowflake, Luggage, UserCheck, Music, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { vehicleImages } from '../data/images.js';
import { businessConfig } from '../config/businessConfig.js';

const POINTS = [
  { icon: Users, t: 'Up to 6 passengers', d: 'Comfortable seating for families and small groups.' },
  { icon: Snowflake, t: 'Air conditioning', d: 'Cool, quiet cabin for long highway and ghat drives.' },
  { icon: Luggage, t: 'Spacious luggage area', d: 'Room for day-trip bags, prasad, shopping and light luggage.' },
  { icon: UserCheck, t: 'Professional driver', d: 'Route-aware, courteous driving across Maharashtra.' },
  { icon: Music, t: 'In-car entertainment', d: "Enjoy music through the vehicle's built-in infotainment system during your journey." },
];

export default function Vehicle() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 text-white">
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Our Vehicle</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{businessConfig.vehicle.name}</h1>
          <p className="mt-3 max-w-2xl text-white/75">Petrol + Electric Smart Hybrid · Private travel for up to {businessConfig.vehicle.capacity} passengers with a professional driver. Built-in infotainment for music during your journey.</p>
        </div>
      </section>
      <div className="container-x py-12 sm:py-16 flex flex-col gap-14">
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-card reveal">
            <SafeImage src={vehicleImages.ertiga} alt={vehicleImages.ertigaAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <p className="bg-navy-950 px-4 py-2.5 text-xs font-semibold text-gold-200">The actual Mirantar Ertiga — Maruti Suzuki Ertiga Smart Hybrid.</p>
          </div>
          <div className="reveal">
            <SectionHeader align="left" eyebrow="Comfort first" title="Made for family journeys" sub="Pilgrimage yatras, hill-station weekends and heritage drives — one familiar, comfortable vehicle every time." />
            <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-slate-700">
              {['Up to 6 passengers', 'Comfortable seating', 'Air conditioning', 'Spacious luggage area', 'Professional driver', 'Suitable for families/groups', 'Private travel', 'In-car entertainment'].map((li) => (
                <li key={li} className="flex items-start gap-2.5"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold-600"><Check size={13} /></span>{li}</li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((p) => (
              <div key={p.t} className="card card-hover p-6 reveal">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-200"><p.icon size={22} /></span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{p.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6 sm:p-8 reveal">
          <h2 className="font-display text-2xl font-semibold text-navy">Our promise on photos</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The photo above is the actual Mirantar Ertiga — we don&apos;t show stock vehicle photos as if they were ours.</p>
          <Link to="/tours" className="btn-navy mt-5">Browse Tours <ArrowRight size={17} /></Link>
        </section>
        <WhatsAppCTA title="Travel private?" sub={businessConfig.tagline} />
      </div>
    </>
  );
}
