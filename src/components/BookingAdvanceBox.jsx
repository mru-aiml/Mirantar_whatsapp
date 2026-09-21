import { Wallet } from 'lucide-react';
import { getBookingAdvance, formatINR } from '../utils/pricing.js';

/*
 * Highlighted booking-advance policy box (gold accent, calm — not alarming).
 * Amount always comes from pricingConfig.booking.advanceAmount.
 */
export default function BookingAdvanceBox({ compact = false }) {
  const advance = formatINR(getBookingAdvance());
  return (
    <div
      className={`rounded-2xl border border-gold/40 bg-gold-50 text-navy reveal ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
      role="note"
      aria-label="Booking advance policy"
    >
      <p className="flex items-center gap-2 font-display text-lg font-semibold">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-gold-200">
          <Wallet size={18} />
        </span>
        Booking Advance · {advance}
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        {advance} advance is required to reserve the vehicle for your selected date.
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        This amount is adjusted against your final trip fare — it is not an additional charge.
      </p>
    </div>
  );
}
