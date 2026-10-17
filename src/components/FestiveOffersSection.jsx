import { Link } from 'react-router-dom';
import { Tag, Route as RouteIcon, ArrowRight, MessageCircle } from 'lucide-react';
import { TOURS } from '../data/tours.js';
import { formatINR, isFestiveOfferEnabled, getFestiveOfferCode, getFestiveDiscountAmount, calculateFestivePrice, isFestiveEligibleOffer } from '../utils/pricing.js';
import SafeImage from './SafeImage.jsx';
import { tourImages } from '../data/images.js';

export default function FestiveOffersSection() {
  if (!isFestiveOfferEnabled()) return null;
  const code = getFestiveOfferCode();
  const discount = getFestiveDiscountAmount();

  const eligible = TOURS.filter((t) => isFestiveEligibleOffer(t.price, t.tripType));
  const popularEligible = eligible.filter((t) => t.popular);
  const list = (popularEligible.length ? popularEligible : eligible).slice(0, 6);

  if (!list.length) return null;

  return (
    <section id="festive-offers" className="scroll-mt-28" aria-label="Festive offers">
      <div className="rounded-3xl bg-gradient-to-br from-gold-50 via-white to-white border border-gold/30 p-6 sm:p-10 shadow-soft">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Limited festive offer</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy">Festive Offers on Outstation Round Trips</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600">
              Save {formatINR(discount)} on eligible outstation packages. Offer code {code}. Availability and eligibility confirmed by Mirantar.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-navy-950">
            <Tag size={14} /> Save {formatINR(discount)}
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => {
            const regular = t.price;
            const festive = calculateFestivePrice(regular);
            return (
              <article key={t.slug} className="card card-hover flex flex-col overflow-hidden">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <SafeImage src={t.image} alt={t.imageAlt || t.name} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-950">
                    Save {formatINR(discount)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy">{t.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{t.route}</p>
                  </div>
                  <div className="rounded-xl bg-cream p-4 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Regular price</span>
                      <span className="line-through">{formatINR(regular)}</span>
                    </div>
                    <div className="mt-1.5 flex justify-between text-lg font-bold text-navy">
                      <span>Festive price</span>
                      <span className="text-gold-600">{formatINR(festive)}</span>
                    </div>
                    <div className="mt-3 border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span className="inline-flex items-center gap-1.5"><RouteIcon size={13} className="text-gold-600" /> Included distance</span>
                        <span className="font-semibold text-navy">Up to {t.includedKm} km</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Extra kilometres</span>
                        <span className="font-semibold text-navy">{formatINR(t.extraKmRate)}/km</span>
                      </div>
                      <div className="flex justify-between font-semibold text-navy">
                        <span>Offer discount</span>
                        <span>-{formatINR(discount)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Toll, parking, extra kilometres, extra hours, permits and applicable driver/night-halt charges remain separate from the package discount.
                  </p>
                  <Link
                    to={`/tours/${t.slug}?offer=${encodeURIComponent(code)}#book`}
                    className="btn-gold mt-auto w-full !py-2.5 text-sm"
                  >
                    <MessageCircle size={15} /> Book This Trip
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
          Offer applies to eligible outstation packages. Availability and eligibility will be confirmed by Mirantar.
        </p>
      </div>
    </section>
  );
}
