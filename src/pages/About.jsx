import { Link } from 'react-router-dom';
import { Car, MessageCircle, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import { IMAGES } from '../data/images.js';

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 text-white">
        <img src={IMAGES.tours.sinhagad} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">About Mirantar</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl sm:text-5xl font-semibold leading-tight">Comfortable, transparent and dependable journeys.</h1>
        </div>
      </section>
      <div className="container-x flex flex-col gap-14 py-12 sm:py-16">
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeader align="left" eyebrow="Who we are" title="A Pune-based private travel service" />
            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              <p><strong className="text-navy">Mirantar is a Pune-based private travel service focused on comfortable, reliable and personalized journeys across Maharashtra.</strong></p>
              <p>We run one-day and multi-day private tours from Pune and surrounding areas in our Maruti Suzuki Ertiga Smart Hybrid — with a professional driver, for up to 6 passengers. Temples, hill stations, forts, weekend escapes and fully custom itineraries.</p>
              <p><strong className="text-navy">Our goal is simple: make every journey comfortable, transparent and dependable.</strong> Per-vehicle fares, honest inclusions, and WhatsApp booking confirmed personally by Mirantar — no apps, no queues, no surprises.</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/tours" className="btn-navy">Explore Tours <ArrowRight size={17} /></Link>
              <Link to="/vehicle" className="btn-outline-navy"><Car size={17} /> Our Vehicle</Link>
            </div>
          </div>
          <div className="img-zoom overflow-hidden rounded-3xl shadow-card reveal">
            <img src={IMAGES.tours.mulshi} alt="Maharashtra landscape" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </section>
        <section className="grid gap-5 sm:grid-cols-3">
          {[
            { t: 'Private, always', d: 'Your group alone in the Ertiga — every single trip.' },
            { t: 'Transparent fares', d: 'Per-vehicle pricing. Toll, parking and halting shown separately, never hidden.' },
            { t: 'Human booking', d: 'WhatsApp enquiries confirmed manually by Mirantar — real answers, fast.' },
          ].map((c) => (
            <div key={c.t} className="card p-6 reveal">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-gold-200"><MessageCircle size={20} /></span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </section>
        <WhatsAppCTA />
      </div>
    </>
  );
}
