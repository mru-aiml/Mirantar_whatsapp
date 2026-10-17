import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { TOURS } from '../data/tours.js';
import { GANPATI_PACKAGES, formatINR, distancePolicyText } from '../data/ganpati.js';
import { tourConfig } from '../config/tourConfig.js';
import { getBookingAdvance, bookingAdvanceExplanation, calculateRemainingFare, isFestiveOfferEnabled, getFestiveOfferCode, getFestiveDiscountAmount, getFestiveMinRegularFare, isFestiveEligibleRegularPrice, calculateFestivePrice } from '../utils/pricing.js';
import { buildBookingMessage, createWhatsAppLink, isValidIndianMobile, isFutureOrToday, todayISO } from '../utils/whatsapp.js';

export default function BookingForm({ presetTour = '', ganpatiPkg = null, tourPricing = null, compact = false, prefillOfferCode = '' }) {
  const [searchParams] = useSearchParams();
  const initialOfferCode = prefillOfferCode || searchParams.get('offer') || '';
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    tour: presetTour || '',
    date: '',
    passengers: '',
    pickup: '',
    message: '',
  });
  const [offerCode, setOfferCode] = useState(initialOfferCode);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const tourOptions = useMemo(() => {
    const base = TOURS.map((t) => t.name);
    const gp = GANPATI_PACKAGES.map((p) => `${p.name} (${p.temples})`);
    const set = new Set([...(presetTour ? [presetTour] : []), ...gp, ...base]);
    return Array.from(set);
  }, [presetTour]);

  // Fixed price source: Ganpati package first, then general tour pricing.
  // Remaining fare is shown/sent ONLY when a fixed final price is known.
  const fixedPrice = ganpatiPkg
    ? ganpatiPkg.regularPrice
    : tourPricing?.price ?? null;

  const regularForOffer = ganpatiPkg ? ganpatiPkg.regularPrice : (tourPricing?.price ?? fixedPrice);
  const otherDiscountActive = false;
  const festiveCodeMatches = isFestiveOfferEnabled() && offerCode.trim().toUpperCase() === getFestiveOfferCode();
  const tripType = ganpatiPkg ? 'outstation' : (tourPricing?.tripType ?? 'outstation');
  const festiveEligible = festiveCodeMatches && !otherDiscountActive && !ganpatiPkg && regularForOffer !== null && isFestiveEligibleOffer(regularForOffer, tripType);
  const festivePrice = festiveEligible ? calculateFestivePrice(regularForOffer) : null;
  const festiveDiscount = festiveEligible ? getFestiveDiscountAmount() : 0;

  const priceLabel = useMemo(() => {
    if (ganpatiPkg) {
      return `${formatINR(fixedPrice)} / vehicle`;
    }
    if (fixedPrice !== null) return `${formatINR(fixedPrice)} / vehicle`;
    return 'Get a Quote';
  }, [ganpatiPkg, fixedPrice]);

  const distanceKm = ganpatiPkg ?? tourPricing;
  const distanceInfo = useMemo(() => {
    if (!distanceKm) return '';
    return `Includes up to ${distanceKm.includedKm} km; extra at ${formatINR(distanceKm.extraKmRate)}/km`;
  }, [distanceKm]);

  const remainingLabel = fixedPrice !== null ? `${formatINR(calculateRemainingFare(fixedPrice))} (after ${formatINR(getBookingAdvance())} advance)` : '';

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched) validate({ ...form, [key]: value });
  }

  function validate(f = form) {
    const e = {};
    if (!f.name.trim()) e.name = 'Please enter your full name.';
    if (!isValidIndianMobile(f.mobile)) e.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    if (!f.tour) e.tour = 'Please select a tour / package.';
    if (!f.date) e.date = 'Please choose a travel date.';
    else if (!isFutureOrToday(f.date)) e.date = 'Travel date cannot be in the past.';
    const n = Number(f.passengers);
    if (!f.passengers || !Number.isInteger(n) || n < 1 || n > tourConfig.defaultMaxPassengers) e.passengers = `Passengers must be between 1 and ${tourConfig.defaultMaxPassengers}.`;
    if (!f.pickup.trim()) e.pickup = 'Please enter your pickup location.';
    setErrors(e);
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    if (Object.keys(e).length) {
      const first = document.querySelector('[data-error="true"]');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const msg = buildBookingMessage({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      tour: form.tour,
      date: form.date,
      passengers: form.passengers,
      pickup: form.pickup.trim(),
      price: priceLabel,
      distanceInfo,
      remainingFare: remainingLabel || undefined,
      message: form.message,
      offerCode: offerCode.trim(),
      regularPrice: regularForOffer,
      discountedPrice: festivePrice,
      bookingAdvance: getBookingAdvance(),
    });
    window.open(createWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  }

  const field = (key, label, input) => (
    <div>
      <label className="label" htmlFor={`bf-${key}`}>
        {label} {['name', 'mobile', 'tour', 'date', 'passengers', 'pickup'].includes(key) && <span className="text-gold-600">*</span>}
      </label>
      {input}
      {touched && errors[key] && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="card scroll-mt-28 p-5 sm:p-7" id="book" aria-label="Tour booking enquiry form">
      <h3 className="font-display text-2xl font-semibold text-navy">Send a Booking Enquiry</h3>
      <p className="mt-1 text-sm text-slate-600">
        Fill in your travel details — we&apos;ll open WhatsApp with a pre-filled enquiry. Mirantar confirms availability manually.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field('name', 'Full Name',
          <input id="bf-name" data-error={!!errors.name} className="input" placeholder="e.g. Priya Deshmukh" value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />)}
        {field('mobile', 'Mobile Number',
          <input id="bf-mobile" data-error={!!errors.mobile} className="input" placeholder="10-digit mobile number" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} inputMode="tel" autoComplete="tel" />)}
        {field('tour', 'Tour / Package',
          <select id="bf-tour" data-error={!!errors.tour} className="input" value={form.tour} onChange={(e) => set('tour', e.target.value)}>
            <option value="">Select a tour…</option>
            {tourOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>)}
        {field('date', 'Travel Date',
          <input id="bf-date" data-error={!!errors.date} className="input" type="date" min={todayISO()} value={form.date} onChange={(e) => set('date', e.target.value)} />)}
        {field('passengers', `Number of Passengers (1–${tourConfig.defaultMaxPassengers})`,
          <input id="bf-passengers" data-error={!!errors.passengers} className="input" type="number" min="1" max={tourConfig.defaultMaxPassengers} placeholder="e.g. 4" value={form.passengers} onChange={(e) => set('passengers', e.target.value)} />)}
        {field('pickup', 'Pickup Location',
          <input id="bf-pickup" data-error={!!errors.pickup} className="input" placeholder="e.g. Kothrud, Pune" value={form.pickup} onChange={(e) => set('pickup', e.target.value)} autoComplete="street-address" />)}
        {field('offerCode', 'Offer Code (optional)',
          <input id="bf-offerCode" className="input" placeholder={getFestiveOfferCode()} value={offerCode} onChange={(e) => setOfferCode(e.target.value.toUpperCase())} />)}
      </div>
      <div className="mt-4">
        <label className="label" htmlFor="bf-message">Additional Message <span className="font-normal text-slate-400">(optional)</span></label>
        <textarea id="bf-message" className="input min-h-[96px] resize-y" placeholder="Temple timings, senior citizens, extra stops…" value={form.message} onChange={(e) => set('message', e.target.value)} />
      </div>
      <div className="mt-4 rounded-xl border border-gold/40 bg-gold-50 p-4 text-sm">
        <span className="font-semibold text-navy">Price: </span>
        <span className="font-bold text-navy">{priceLabel}</span>
        {ganpatiPkg && (
          <span className="block text-xs text-slate-600 mt-1.5">{distancePolicyText(ganpatiPkg.includedKm, ganpatiPkg.extraKmRate)}</span>
        )}
        {festivePrice !== null && (
          <div className="mt-2 rounded-lg bg-white/70 p-3 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Regular package fare</span>
              <span className="line-through">{formatINR(regularForOffer)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Festive discount ({getFestiveOfferCode()})</span>
              <span>-{formatINR(festiveDiscount)}</span>
            </div>
            <div className="flex justify-between font-bold text-navy">
              <span>Discounted package fare</span>
              <span className="text-gold-600">{formatINR(festivePrice)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Booking advance</span>
              <span>{formatINR(getBookingAdvance())}</span>
            </div>
            <div className="flex justify-between font-semibold text-navy">
              <span>Remaining package balance after advance</span>
              <span>{formatINR(Math.max(0, festivePrice - getBookingAdvance()))}</span>
            </div>
          </div>
        )}
        {offerCode.trim() && !festiveEligible && isFestiveOfferEnabled() && (
          <span className="block text-xs text-slate-600 mt-1.5">
            Festive offer not applied: enter {getFestiveOfferCode()} for an eligible outstation package.
          </span>
        )}
        <span className="block text-xs text-slate-600 mt-1.5">
          <strong className="text-navy">Booking Advance: {formatINR(getBookingAdvance())}.</strong> {bookingAdvanceExplanation()}
        </span>
        {fixedPrice !== null && (
          <span className="block text-xs text-slate-600 mt-1.5">
            <strong className="text-navy">Remaining Trip Fare: {formatINR(calculateRemainingFare(fixedPrice))}.</strong> Payable after the advance is adjusted.
          </span>
        )}
        <span className="block text-xs text-slate-500 mt-1">Toll, parking and halting charges, wherever applicable, are payable separately by the passenger.</span>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Offer applies to eligible outstation packages. Availability and eligibility will be confirmed by Mirantar.
        </p>
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-600">
        <strong className="text-navy">Booking status:</strong> submitting this form sends a booking request only. Mirantar confirms availability; the booking is confirmed only after the {formatINR(getBookingAdvance())} advance is received.
      </div>
      <button type="submit" className="btn-gold mt-5 w-full !py-3.5 text-base">
        <MessageCircle size={19} /> Book on WhatsApp
      </button>
      <p className="mt-2 text-center text-xs font-semibold text-gold-600">
        {formatINR(getBookingAdvance())} booking advance required to reserve the vehicle
      </p>
      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
        This opens WhatsApp with a pre-filled <strong>enquiry</strong> — your booking is confirmed only after Mirantar replies.
      </p>
    </form>
  );
}
