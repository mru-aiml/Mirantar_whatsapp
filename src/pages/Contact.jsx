import { useState } from 'react';
import { Phone, MessageCircle, Globe, MapPin, Send } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { businessConfig } from '../config/businessConfig.js';
import { createWhatsAppLink, getCallLink, getPhoneDisplay, isValidIndianMobile } from '../utils/whatsapp.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  function validate(f = form) {
    const e = {};
    if (!f.name.trim()) e.name = 'Please enter your name.';
    if (!isValidIndianMobile(f.mobile)) e.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    if (!f.message.trim()) e.message = 'Please write a short message.';
    setErrors(e);
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    if (Object.keys(e).length) return;
    const msg = `🙏 *Mirantar Enquiry*\n\n*Name:* ${form.name.trim()}\n*Mobile:* ${form.mobile.trim()}\n\n${form.message.trim()}\n\nThank you.\n\n${businessConfig.name}\n${businessConfig.tagline}`;
    window.open(createWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <section className="bg-navy-950 pt-28 pb-14 sm:pt-32 text-white">
        <div className="container-x">
          <p className="eyebrow !text-gold-200">Contact</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Talk to Mirantar</h1>
          <p className="mt-3 max-w-2xl text-white/75">Call or WhatsApp us — we confirm every enquiry personally. No accounts, no apps, no waiting on hold.</p>
        </div>
      </section>
      <div className="container-x grid gap-8 py-12 lg:grid-cols-2">
        <div className="card h-fit p-6 sm:p-8 reveal">
          <p className="font-display text-2xl font-bold tracking-[0.15em] text-navy">MIRANTAR</p>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600">{businessConfig.tagline}</p>
          <ul className="mt-6 space-y-4 text-sm sm:text-base">
            <li className="flex items-center gap-3"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><MapPin size={18} /></span><span><strong className="block text-navy">Location</strong><span className="text-slate-600">{businessConfig.city}</span></span></li>
            <li className="flex items-center gap-3"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><Phone size={18} /></span><span><strong className="block text-navy">Phone</strong><a className="text-slate-600 hover:text-navy" href={getCallLink()}>{getPhoneDisplay()}</a></span></li>
            <li className="flex items-center gap-3"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><MessageCircle size={18} /></span><span><strong className="block text-navy">WhatsApp</strong><a className="text-slate-600 hover:text-navy" href={createWhatsAppLink()} target="_blank" rel="noreferrer">{getPhoneDisplay()}</a></span></li>
            <li className="flex items-center gap-3"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-200"><Globe size={18} /></span><span><strong className="block text-navy">Website</strong><span className="text-slate-600">{businessConfig.website}</span></span></li>
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href={getCallLink()} className="btn-navy flex-1"><Phone size={17} /> Call Now</a>
            <a href={createWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-gold flex-1"><MessageCircle size={17} /> WhatsApp</a>
          </div>
          <p className="mt-4 text-xs text-slate-500">We don&apos;t list a physical office address — pickup is arranged across Pune within the defined service area.</p>
        </div>
        <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8 reveal" aria-label="Contact form">
          <SectionHeader align="left" eyebrow="Quick message" title="Send us a message" sub="Opens WhatsApp with your message pre-filled." />
          <div className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="c-name">Your Name *</label>
              <input id="c-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" autoComplete="name" />
              {touched && errors.name && <p className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="c-mobile">Mobile Number *</label>
              <input id="c-mobile" className="input" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="10-digit mobile number" inputMode="tel" autoComplete="tel" />
              {touched && errors.mobile && <p className="mt-1 text-xs text-red-600" role="alert">{errors.mobile}</p>}
            </div>
            <div>
              <label className="label" htmlFor="c-msg">Message *</label>
              <textarea id="c-msg" className="input min-h-[120px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Where do you want to go, and when?" />
              {touched && errors.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-gold w-full !py-3.5"><Send size={17} /> Send via WhatsApp</button>
          </div>
        </form>
      </div>
    </>
  );
}
