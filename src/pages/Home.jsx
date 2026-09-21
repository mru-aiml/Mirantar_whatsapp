import { Link } from 'react-router-dom';
import { Car, UserCheck, Armchair, Map, MessageCircle, ArrowRight, Check, ShieldCheck, Clock, HeartHandshake, Route as RouteIcon } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import OfferBanner from '../components/OfferBanner.jsx';
import TourGrid from '../components/TourGrid.jsx';
import FAQ from '../components/FAQ.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import BookingSteps from '../components/BookingSteps.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { heroImages, vehicleImages, tourImages } from '../data/images.js';
import { FARE_NOTE } from '../data/site.js';
import { businessConfig } from '../config/businessConfig.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import { getPopularTours } from '../data/tours.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Home() {
  usePageMeta({
    title: 'Mirantar | Private Tours & Cab Service from Pune',
    description:
      'Pune private cab and outstation tours from Pune — private Ertiga tours for Ashtavinayak Yatra, Ganpati tour packages, pilgrimage tours and Maharashtra tours from Pune.',
  });

  const popular = getPopularTours();
  return (
    <>
      <Hero
        kicker="Pune · Private Ertiga Tours · Up to 6 Passengers"
        title="Explore Maharashtra with Mirantar"
        sub="Private journeys. Comfortable travel. Reliable service."
        sub2="Discover temples, hill stations, heritage destinations and weekend escapes from Pune."
        image={heroImages.home}
        alt={heroImages.homeAlt}
      >
        <Link to="/tours" className="btn-gold">Explore Tours <ArrowRight size={17} /></Link>
        <a href={createWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle size={17} /> Book on WhatsApp</a>
      </Hero>

      {/* Trust strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-xs sm:text-sm font-semibold text-navy">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-gold-600" /> Private vehicle, always</span>
          <span className="inline-flex items-center gap-2"><UserCheck size={16} className="text-gold-600" /> Professional driver</span>
          <span className="inline-flex items-center gap-2"><MessageCircle size={16} className="text-gold-600" /> Direct WhatsApp support</span>
          <span className="inline-flex items-center gap-2"><Check size={16} className="text-gold-600" /> Transparent per-vehicle pricing</span>
        </div>
      </div>

      <div className="container-x py-14 sm:py-20 flex flex-col gap-16 sm:gap-24">
        {/* Travel your way */}
        <section aria-label="Travel your way">
          <SectionHeader eyebrow="Why Mirantar" title="Travel Your Way" sub="One private Ertiga, one professional driver, and an itinerary shaped around your family." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Car} title="Private Travel" text="The whole Ertiga is yours — no sharing, no strangers, no fixed bus schedules." />
            <FeatureCard icon={UserCheck} title="Professional Driver" text="Courteous, route-aware driving on ghats, highways and temple-town lanes." />
            <FeatureCard icon={Armchair} title="Comfortable Ertiga" text={`${businessConfig.vehicle.name} with AC and room for up to ${businessConfig.vehicle.capacity} passengers.`} />
            <FeatureCard icon={Map} title="Flexible Itineraries" text="Start times, darshan order, food halts and photo stops — planned around you." />
          </div>
        </section>

        <OfferBanner />

        {/* Popular tours */}
        <section aria-label="Popular Maharashtra tours">
          <SectionHeader eyebrow="From Pune" title="Popular Maharashtra Tours" sub="One-day and multi-day private tours. Fixed Ganpati prices are per vehicle; everything else is quoted on WhatsApp." />
          <div className="mt-8"><TourGrid tours={popular} /></div>
          <div className="mt-8 text-center">
            <Link to="/tours" className="btn-navy">View All Tours <ArrowRight size={17} /></Link>
          </div>
        </section>

        {/* Vehicle */}
        <section className="grid items-center gap-8 lg:grid-cols-2" aria-label="Our vehicle">
          <div className="overflow-hidden rounded-3xl shadow-card reveal">
            <SafeImage src={vehicleImages.ertiga} alt={vehicleImages.ertigaAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <p className="bg-navy-950 px-4 py-2 text-[11px] text-white/70">The actual Mirantar Ertiga — Maruti Suzuki Ertiga Smart Hybrid.</p>
          </div>
          <div className="reveal">
            <p className="eyebrow">Our Vehicle</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-navy">{businessConfig.vehicle.name}</h2>
            <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-slate-700">
              {['Up to 6 passengers', 'Spacious cabin', 'Air conditioning', 'Professional driver', 'In-car entertainment', 'Suitable for families and small groups'].map((li) => (
                <li key={li} className="flex items-start gap-2.5"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold-600"><Check size={13} /></span>{li}</li>
              ))}
            </ul>
            <Link to="/vehicle" className="btn-navy mt-6">View Our Vehicle <ArrowRight size={17} /></Link>
          </div>
        </section>

        {/* Why travel */}
        <section className="rounded-3xl bg-white p-8 sm:p-12 shadow-soft border border-slate-100" aria-label="Why travel with Mirantar">
          <SectionHeader eyebrow="Good to know" title="Why Travel With Mirantar?" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Car, t: 'Private vehicle', d: 'Only your group travels — every trip is exclusive.' },
              { icon: UserCheck, t: 'Professional driver', d: 'Experienced with Maharashtra routes and temple towns.' },
              { icon: Clock, t: 'Flexible pickup', d: 'Pickup across Pune within the defined service area.' },
              { icon: HeartHandshake, t: 'Family-friendly travel', d: 'Comfortable pacing for seniors, kids and large families.' },
              { icon: RouteIcon, t: 'Personalised itineraries', d: 'Darshan order, halts and sightseeing shaped around you.' },
              { icon: MessageCircle, t: 'Direct WhatsApp support', d: 'Talk to Mirantar directly — no call centres, no apps.' },
            ].map((f) => (
              <div key={f.t} className="flex gap-3 rounded-2xl bg-cream p-5 reveal">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-gold-200"><f.icon size={19} /></span>
                <span><strong className="block text-navy">{f.t}</strong><span className="text-sm text-slate-600">{f.d}</span></span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">{FARE_NOTE}</p>
        </section>

        {/* Custom trip */}
        <section className="grid items-center gap-8 rounded-3xl bg-navy p-8 sm:p-12 text-white lg:grid-cols-2 reveal" aria-label="Plan your own trip">
          <div>
            <p className="eyebrow !text-gold-200">Custom Trips</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold">Have a destination in mind?</h2>
            <p className="mt-3 text-white/75 leading-relaxed">Tell us where you want to go, when you want to travel and how many people are travelling. We&apos;ll help you plan the journey.</p>
            <Link to="/custom-trip" className="btn-gold mt-6">Get a Custom Quote <ArrowRight size={17} /></Link>
          </div>
          <div className="img-zoom overflow-hidden rounded-2xl">
            <SafeImage src={tourImages.custom} alt="Custom road trip from Pune" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          </div>
        </section>

        <BookingSteps />

        <section aria-label="Frequently asked questions">
          <SectionHeader eyebrow="FAQ" title="Good to know before you book" sub="Transparent inclusions, honest exclusions — no surprises on the road." />
          <div className="mt-8"><FAQ /></div>
        </section>

        <WhatsAppCTA />
      </div>
    </>
  );
}
