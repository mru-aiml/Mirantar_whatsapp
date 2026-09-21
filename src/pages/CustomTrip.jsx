import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { buildCustomTripMessage, whatsappLink, isValidIndianMobile, isFutureOrToday, todayISO } from '../utils/whatsapp.js';
import { IMAGES } from '../data/images.js';

export default function CustomTrip() {
  const [form, setForm] = useState({ name: '', phone: '', destination: '', date: '', passengers: '', pickup: '', duration: 'One Day', requirements: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  function set(key, value) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched) validate(next);
  }

  function validate(f = form) {
    const e = {};
    if (!f.name.trim()) e.name = 'Please enter your full name.';
    if (!isValidIndianMobile(f.phone)) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
    if (!f.destination.trim()) e.destination = 'Please enter your destination.';
    if (!f.date) e.date = 'Please choose a travel date.';
    else if (!isFutureOrToday(f.date)) e.date = 'Travel date cannot be in the past.';
    const n = Number(f.passengers);
    if (!f.passengers || !Number.isInteger(n) || n < 1 || n > 6) e.passengers = 'Passengers must be between 1 and 6.';
    if (!f.pickup.trim()) e.pickup = 'Please enter your pickup location.';
    if (!f.duration.trim()) e.duration = 'Please enter trip duration.';
    setErrors(e);
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    if (Object.keys(e).length) return;
    const msg = buildCustomTripMessage({
      name: form.name.trim(), phone: form.phone.trim(), destination: form.destination.trim(),
      date: form.date, passengers: form.passengers, pickup: form.pickup.trim(),
      duration: form.duration.trim(), requirements: form.requirements,
    });
    window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer');
  }

  const cls = (k) => 'input' + (touched && errors[k] ? ' !border-red-400' : '');
  const err = (k) => touched && errors[k] && <p className="mt-1 text-xs font-medium text-red-600" role="alert">{errors[k]}</p>;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 text-white">
        <img src={IMAGES.tours.custom} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Custom Trip / Get a Quote</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Plan Your Own Journey</h1>
          <p className="mt-3 max-w-2xl text-white/75">Your destination. Your itinerary. Tell us the plan — we&apos;ll reply on WhatsApp with a per-vehicle quotation and availability.</p>
        </div>
      </section>
      <div className="container-x max-w-3xl py-12">
        <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8 reveal" aria-label="Custom trip quote form">
          <SectionHeader align="left" eyebrow="Price: Get a Quote" title="Request a custom quote" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="q-name">Name *</label><input id="q-name" className={cls('name')} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" autoComplete="name" />{err('name')}</div>
            <div><label className="label" htmlFor="q-phone">Phone *</label><input id="q-phone" className={cls('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="10-digit mobile" inputMode="tel" autoComplete="tel" />{err('phone')}</div>
            <div><label className="label" htmlFor="q-dest">Destination *</label><input id="q-dest" className={cls('destination')} value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="e.g. Konkan loop, Kolhapur" />{err('destination')}</div>
            <div><label className="label" htmlFor="q-date">Travel Date *</label><input id="q-date" type="date" min={todayISO()} className={cls('date')} value={form.date} onChange={(e) => set('date', e.target.value)} />{err('date')}</div>
            <div><label className="label" htmlFor="q-pax">Passengers (1–6) *</label><input id="q-pax" type="number" min="1" max="6" className={cls('passengers')} value={form.passengers} onChange={(e) => set('passengers', e.target.value)} placeholder="e.g. 5" />{err('passengers')}</div>
            <div><label className="label" htmlFor="q-pickup">Pickup Location *</label><input id="q-pickup" className={cls('pickup')} value={form.pickup} onChange={(e) => set('pickup', e.target.value)} placeholder="e.g. Baner, Pune" />{err('pickup')}</div>
            <div className="sm:col-span-2"><label className="label" htmlFor="q-dur">Trip Duration *</label>
              <select id="q-dur" className={cls('duration')} value={form.duration} onChange={(e) => set('duration', e.target.value)}>
                <option>Half Day</option><option>One Day</option><option>2 Days</option><option>3 Days</option><option>4+ Days</option>
              </select>{err('duration')}</div>
            <div className="sm:col-span-2"><label className="label" htmlFor="q-req">Additional Requirements <span className="font-normal text-slate-400">(optional)</span></label><textarea id="q-req" className="input min-h-[110px]" value={form.requirements} onChange={(e) => set('requirements', e.target.value)} placeholder="Senior citizens, temple order, night halt, extra stops…" /></div>
          </div>
          <div className="mt-4 rounded-xl border border-gold/40 bg-gold-50 p-4 text-sm"><span className="font-semibold text-navy">Price: </span><span className="font-bold text-navy">Get a Quote</span><span className="block text-xs text-slate-500 mt-1">Toll, parking and halting charges, wherever applicable, are payable separately by the passenger.</span></div>
          <button type="submit" className="btn-gold mt-5 w-full !py-3.5"><MessageCircle size={19} /> Get Custom Quote on WhatsApp</button>
          <p className="mt-3 text-center text-xs text-slate-500">This opens WhatsApp with a pre-filled <strong>enquiry</strong> — confirmed manually by Mirantar.</p>
        </form>
      </div>
    </>
  );
}
