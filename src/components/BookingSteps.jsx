import { Map, MessageCircle, Wallet, BadgeCheck, Receipt } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { getBookingAdvance, formatINR } from '../utils/pricing.js';

/*
 * "How Booking Works" — 5-step booking flow.
 * The advance amount always comes from pricingConfig.booking.
 * Never implies that contacting on WhatsApp auto-confirms a booking.
 */
export default function BookingSteps() {
  const advance = formatINR(getBookingAdvance());
  const steps = [
    { icon: Map, title: 'Choose your trip', text: 'Select a tour or request a custom itinerary.' },
    { icon: MessageCircle, title: 'Confirm availability', text: 'Contact Mirantar on WhatsApp and share your travel details.' },
    { icon: Wallet, title: `Pay ${advance} booking advance`, text: `A ${advance} advance is required to reserve the Ertiga for your selected date.` },
    { icon: BadgeCheck, title: 'Trip confirmed', text: 'Mirantar confirms your booking after payment verification.' },
    { icon: Receipt, title: 'Pay remaining fare', text: 'The booking advance is adjusted against your final trip fare.' },
  ];

  return (
    <section aria-label="How booking works">
      <SectionHeader
        eyebrow="Simple & transparent"
        title="How Booking Works"
        sub="Five clear steps — no apps, no accounts, no surprises."
      />
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="card card-hover relative p-5 reveal">
            <span
              className="absolute right-4 top-4 font-display text-3xl font-bold text-navy/10"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-gold-200">
              <s.icon size={20} />
            </span>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-600">
              Step {i + 1}
            </p>
            <h3 className="mt-1 font-display text-base font-semibold leading-snug text-navy">
              {s.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-xs text-slate-500">
        Enquiries on WhatsApp · Confirmed manually by Mirantar
      </p>
    </section>
  );
}
