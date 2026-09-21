import { Link, useParams } from 'react-router-dom';
import { Clock, Route as RouteIcon, Check, X, ArrowLeft, MessageCircle } from 'lucide-react';
import BookingForm from '../components/BookingForm.jsx';
import TourGrid from '../components/TourGrid.jsx';
import { getTourBySlug, TOURS } from '../data/tours.js';
import { FARE_NOTE, SITE } from '../data/site.js';
import { formatINR, distancePolicyText, getBookingAdvance, calculateRemainingFare } from '../utils/pricing.js';
import { buildBookingMessage, createWhatsAppLink } from '../utils/whatsapp.js';
import NotFound from './NotFound.jsx';

export default function TourDetails() {
  const { slug } = useParams();
  const tour = getTourBySlug(slug);
  if (!tour) return <NotFound />;

  const related = TOURS.filter((t) => t.slug !== tour.slug && t.category === tour.category).slice(0, 4);
  const hasFixedPrice = tour.price !== null && tour.price !== undefined;
  const remainingFare = hasFixedPrice ? `${formatINR(calculateRemainingFare(tour.price))} (after ${formatINR(getBookingAdvance())} advance)` : undefined;
  const quickMsg = buildBookingMessage({
    name: '', mobile: '', tour: tour.name, date: '', passengers: '', pickup: '',
    price: hasFixedPrice ? `${formatINR(tour.price)} / vehicle` : 'Get a Quote',
    distanceInfo: tour.includedKm ? `Includes up to ${tour.includedKm} km; extra at ${formatINR(tour.extraKmRate)}/km` : '',
    remainingFare, message: '',
  });
  const tourPricing = hasFixedPrice ? { price: tour.price, includedKm: tour.includedKm, extraKmRate: tour.extraKmRate } : null;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-24 text-white">
        <img src={tour.image} alt={tour.imageAlt || `${tour.name} with Mirantar`} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/55 to-navy-950" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <Link to="/tours" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-200 hover:text-white"><ArrowLeft size={16} /> All tours</Link>
          <p className="eyebrow !text-gold-200 mt-4">{tour.category} · {tour.duration}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{tour.name}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{tour.short}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><Clock size={15} className="text-gold-200" />{tour.duration}</span>
            <span className="inline-flex items-center gap-2"><RouteIcon size={15} className="text-gold-200" />{tour.route}</span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#book" className="btn-gold"><MessageCircle size={17} /> {tour.price ? 'Book on WhatsApp' : 'Get Quote on WhatsApp'}</a>
            <a href={createWhatsAppLink(quickMsg)} target="_blank" rel="noreferrer" className="btn-outline">Quick Enquiry</a>
          </div>
          <p className="mt-3 text-sm font-bold text-gold-200">{tour.price ? `₹${tour.price.toLocaleString('en-IN')} / vehicle` : 'Price: Get a Quote'}</p>
        </div>
      </section>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-navy">About this tour</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">{tour.description}</p>
            <h3 className="mt-6 font-semibold text-navy">Highlights</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {tour.highlights.map((h) => <li key={h} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-gold-600" />{h}</li>)}
            </ul>
            <h3 className="mt-6 font-semibold text-navy">Route</h3>
            <p className="mt-1 text-sm text-slate-600">{tour.route}</p>
            <h3 className="mt-6 font-semibold text-navy">Vehicle</h3>
            <p className="mt-1 text-sm text-slate-600">{SITE.vehicle} · Up to {SITE.capacity} passengers · Professional driver · Private travel.</p>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-navy">Trip Pricing</h2>
            {hasFixedPrice ? (
              <>
                <div className="mt-4 space-y-2 rounded-2xl bg-cream p-5 text-sm sm:text-base">
                  <div className="flex justify-between font-bold text-navy"><span>Trip Price</span><span>{formatINR(tour.price)} / vehicle</span></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-navy">
                    <span className="inline-flex items-center gap-1.5"><RouteIcon size={15} className="text-gold-600" /> Distance Included</span>
                    <span>Up to {tour.includedKm} km</span>
                  </div>
                  <div className="flex justify-between text-slate-600"><span>Additional Distance</span><span className="font-semibold">{formatINR(tour.extraKmRate)}/km</span></div>
                  <div className="flex justify-between font-semibold text-navy"><span>Booking Advance</span><span>{formatINR(getBookingAdvance())}</span></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-navy"><span>Remaining Trip Fare</span><span>{formatINR(calculateRemainingFare(tour.price))}</span></div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">Booking advance is adjusted against the final trip fare — it is not an additional charge.</p>
              </>
            ) : (
              <>
                <div className="mt-4 rounded-2xl bg-cream p-5 text-sm sm:text-base">
                  <div className="flex justify-between font-bold text-navy"><span>Trip Price</span><span className="text-gold-600">Get a Quote</span></div>
                  <div className="mt-2 flex justify-between font-semibold text-navy"><span>Booking Advance</span><span>{formatINR(getBookingAdvance())}</span></div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">This itinerary is quoted manually on WhatsApp based on your date, route and group size.</p>
              </>
            )}
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {distancePolicyText(tour.includedKm ?? 200, tour.extraKmRate ?? 18)} Measured on the vehicle&apos;s total journey from its base in Pune.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-navy">What&apos;s included</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {tour.included.map((li) => <li key={li} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-green-600" />{li}</li>)}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-navy">What&apos;s excluded</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {tour.excluded.map((li) => <li key={li} className="flex gap-2"><X size={15} className="mt-0.5 shrink-0 text-red-500" />{li}</li>)}
              </ul>
            </div>
          </div>
          {tour.notes?.length > 0 && (
            <div className="card p-6 sm:p-8">
              <h3 className="font-semibold text-navy">Important notes</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
                {tour.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          )}
          <p className="rounded-2xl border border-gold/40 bg-gold-50 p-4 text-sm leading-relaxed text-navy">{FARE_NOTE}</p>
        </div>
        <div className="lg:sticky lg:top-24 h-fit"><BookingForm presetTour={tour.name} tourPricing={tourPricing} /></div>
      </div>

      {related.length > 0 && (
        <div className="container-x pb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">You may also like</h2>
          <div className="mt-6"><TourGrid tours={related} /></div>
        </div>
      )}
    </>
  );
}
