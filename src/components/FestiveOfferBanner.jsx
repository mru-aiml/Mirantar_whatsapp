import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import { isFestiveOfferEnabled, getFestiveOfferCode, getFestiveDiscountAmount, getFestiveMinRegularFare, getFestiveMaxConfirmedBookings } from '../utils/pricing.js';
import { formatINR } from '../utils/pricing.js';

export default function FestiveOfferBanner() {
  if (!isFestiveOfferEnabled()) return null;
  const code = getFestiveOfferCode();
  const discount = getFestiveDiscountAmount();


  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white pt-24 sm:pt-28"
      aria-label="Mirantar festive offer banner"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="container-x py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-navy-950">
              <Gift size={22} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-200">MIRANTAR FESTIVE GETAWAYS</p>
              <h2 className="font-display text-xl sm:text-2xl font-semibold leading-tight">Make more memories on the road this festive season.</h2>
              <p className="mt-1 text-sm text-white/85">
                Get {formatINR(discount)} OFF eligible outstation packages — round-trips and one-way transfers.
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
                <li>Outstation packages only. Local packages excluded.</li>
                <li>Offer code: <span className="font-mono font-bold text-gold-200">{code}</span></li>
              </ul>
            </div>
          </div>
          <Link to="/#festive-offers" className="btn-gold shrink-0">
            <Sparkles size={17} /> Claim Festive Offer <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
