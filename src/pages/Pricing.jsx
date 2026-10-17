import { Link } from 'react-router-dom';
import { MessageCircle, Plane, Clock, Route as RouteIcon, Wallet, Tag } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { TOURS } from '../data/tours.js';
import { formatINR, getBookingAdvance, getAirportTransferStartingPrice, getExtraHourRate, isFestiveOfferEnabled, getFestiveOfferCode, getFestiveDiscountAmount, getFestiveMinRegularFare, calculateFestivePrice } from '../utils/pricing.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import { IMAGES } from '../data/images.js';

export default function Pricing() {
  const extraHourRate = getExtraHourRate();
  const airportStarting = getAirportTransferStartingPrice();
  const advance = getBookingAdvance();
  const festiveEnabled = isFestiveOfferEnabled();
  const festiveCode = getFestiveOfferCode();
  const festiveDiscount = getFestiveDiscountAmount();
  const festiveMin = getFestiveMinRegularFare();
  const pricedTours = TOURS.filter((t) => t.price !== null && t.price !== undefined);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 text-white">
        <img src={IMAGES.tours.mahabaleshwar} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Pricing</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Transparent per-vehicle fares</h1>
          <p className="mt-3 max-w-2xl text-white/75">All prices are per vehicle (up to 6 passengers), not per person. Toll, parking, extra kilometres, extra hours, permits and applicable driver/night-halt charges are separate.</p>
        </div>
      </section>

      <div className="container-x py-12 sm:py-16 flex flex-col gap-12">
        {festiveEnabled && (
          <div className="rounded-3xl border border-gold/40 bg-gold-50 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Limited festive offer</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Festive Offer: Save {formatINR(festiveDiscount)}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Eligible outstation packages. Offer code {festiveCode}. Not a permanent price change.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-navy-950">
                <Tag size={14} /> {festiveCode}
              </span>
            </div>
          </div>
        )}

        <section aria-label="Tour pricing">
          <SectionHeader align="left" eyebrow="Fixed fares" title="Maharashtra Tours" sub="Tours without a fixed fare are quoted on WhatsApp." />
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-soft">
            <table className="min-w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Tour</th>
                  <th className="px-4 py-3 text-left font-semibold">Regular price</th>
                  {festiveEnabled && <th className="px-4 py-3 text-left font-semibold">Festive price</th>}
                  <th className="px-4 py-3 text-left font-semibold">Included km</th>
                  <th className="px-4 py-3 text-left font-semibold">Extra km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricedTours.map((t) => (
                  <tr key={t.slug} className="hover:bg-cream">
                    <td className="px-4 py-3 font-medium text-navy">{t.name}</td>
                    <td className="px-4 py-3 text-slate-700">{formatINR(t.price)}</td>
                    {festiveEnabled && (
                      <td className="px-4 py-3 font-semibold text-gold-600">
                        {t.price >= festiveMin ? formatINR(calculateFestivePrice(t.price)) : 'Not eligible'}
                      </td>
                    )}
                    <td className="px-4 py-3 text-slate-700">Up to {t.includedKm} km</td>
                    <td className="px-4 py-3 text-slate-700">{formatINR(t.extraKmRate)}/km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2" aria-label="Other pricing">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><Plane size={18} /></span>
              <h2 className="font-display text-xl font-semibold text-navy">Airport transfers</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Airport transfers from {formatINR(airportStarting)}. Final fare depends on pickup and drop locations.
            </p>
            <p className="mt-2 text-xs text-slate-500">Festive discount not applied to airport transfers by default.</p>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><Wallet size={18} /></span>
              <h2 className="font-display text-xl font-semibold text-navy">Booking advance</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {formatINR(advance)} advance is required to reserve the vehicle for your selected date. Adjusted against the final trip fare, not an additional charge.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><Clock size={18} /></span>
              <h2 className="font-display text-xl font-semibold text-navy">Extra hours</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {extraHourRate !== null ? `${formatINR(extraHourRate)} per hour, per vehicle.` : 'Extra hours charged as applicable, confirmed on WhatsApp.'}
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><RouteIcon size={18} /></span>
              <h2 className="font-display text-xl font-semibold text-navy">Charges kept separate</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Toll, parking, extra kilometres, extra hours, permits and applicable driver/night-halt charges remain separate from the package discount.
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact" className="btn-navy"><MessageCircle size={17} /> Get a Quote on WhatsApp</Link>
        </div>
      </div>
    </>
  );
}
