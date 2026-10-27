import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { bookingAdvanceExplanation, isFestiveOfferEnabled, getFestiveOfferCode, getFestiveDiscountAmount, getFestiveMinRegularFare, getFestiveMaxConfirmedBookings, formatINR } from '../utils/pricing.js';

export function getAdvanceFAQ() {
  return {
    q: 'Is a booking advance required?',
    a: `Yes. ${bookingAdvanceExplanation()}`,
  };
}

export const FAQS = [
  getAdvanceFAQ(),
  { q: 'What is included in the package price?', a: 'Vehicle, fuel and professional driver are included.' },
  { q: 'Is toll included?', a: 'Toll charges are payable separately wherever applicable.' },
  { q: 'Are parking charges included?', a: 'Parking charges are payable separately wherever applicable.' },
  { q: 'Are halting/night-stay charges included?', a: 'Halting or night-stay charges are payable separately wherever applicable.' },
  { q: 'How many passengers can travel?', a: 'The Ertiga is suitable for up to 6 passengers.' },
  {
    q: 'How does the distance limit work?',
    a: 'Each fixed package includes a defined travel distance. If the total vehicle journey exceeds that limit, the additional distance is charged per kilometre.',
  },
  { q: 'How do I book?', a: 'Send us your trip details on WhatsApp. Mirantar will manually confirm availability and the final fare.' },
  { q: 'Can I plan a custom trip?', a: 'Yes. Use the Custom Trip form to request a quotation.' },
  {
    q: 'What is the Mirantar Festive Offer?',
    a: isFestiveOfferEnabled()
      ? `Eligible outstation packages receive ${formatINR(getFestiveDiscountAmount())} off using code ${getFestiveOfferCode()}. This includes outstation round-trips and one-way outstation transfers. Local packages and airport transfers are not eligible. Limited to the first ${getFestiveMaxConfirmedBookings()} confirmed bookings across the campaign.`
      : 'The festive offer is currently disabled.',
  },
  {
    q: 'Is the festive discount the same as the booking advance?',
    a: 'No. The festive discount reduces the package fare. The Rs.500 booking advance is a separate amount required to reserve the vehicle and is adjusted against the final trip fare.',
  },
  {
    q: 'Who is eligible for the festive offer?',
    a: 'Outstation packages — both round-trips and one-way transfers. Local packages, airport transfers and custom quotes are not eligible. There is no minimum fare requirement. Mirantar confirms availability and eligibility on WhatsApp.',
  },
  {
    q: 'How do I claim the festive offer?',
    a: `Enter offer code ${getFestiveOfferCode()} in the booking form or use a festive offer booking button. Submitting the form sends a request only; the booking is confirmed after Mirantar confirms availability and receives the required advance.`,
  },
  {
    q: 'Is the first-10-bookings limit guaranteed by the website?',
    a: `The limit of ${getFestiveMaxConfirmedBookings()} confirmed bookings is a campaign rule. Because bookings are confirmed by Mirantar manually on WhatsApp, the website cannot automatically enforce this cap. Mirantar tracks confirmed bookings and will disable the offer once ${getFestiveMaxConfirmedBookings()} are confirmed. Always confirm availability with Mirantar before booking.`,
  },
];

export default function FAQ({ items = FAQS }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-soft reveal">
      {items.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={f.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
              onClick={() => setOpenIdx(open ? -1 : i)}
              aria-expanded={open}
            >
              <span className="text-sm sm:text-base font-semibold text-navy">{f.q}</span>
              <ChevronDown size={18} className={`shrink-0 text-gold-600 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
