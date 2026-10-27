import { useState } from 'react';
import { MessageCircle, Users, Handshake, MapPin, Briefcase, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { isValidIndianMobile, buildJoinUsMessage, createWhatsAppLink } from '../utils/whatsapp.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { useReveal } from '../hooks/useReveal.js';

/*
 * ⚠️  SUBMISSION ARCHITECTURE — READ BEFORE MODIFYING
 * ─────────────────────────────────────────────────────
 * This site has NO backend, database, or email service.
 * Enquiries are sent via WhatsApp (wa.me link), identical to the
 * booking and custom-trip forms. The owner reads and responds manually.
 *
 * Spam protection used:
 *   1. Honeypot field (hp_field) — hidden from real users, bots fill it.
 *   2. Time-delay check — form must take >2 s to fill (bot guard).
 *   3. Input validation — required fields, mobile format, min lengths.
 *
 * For persistent applications (email delivery, saved records):
 *   Add a Firebase Cloud Function or Resend/Brevo integration.
 *   Neither is included because no paid/external service was requested.
 */

const OPPORTUNITIES = [
  'Driver',
  'Travel / Tour Partner',
  'Local Experience / Destination Partner',
  'Marketing / Business Collaboration',
];

const OPPORTUNITY_ICONS = {
  'Driver': Users,
  'Travel / Tour Partner': Handshake,
  'Local Experience / Destination Partner': MapPin,
  'Marketing / Business Collaboration': Briefcase,
};

const INITIAL = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  opportunity: '',
  experience: '',
  message: '',
  consent: false,
  // Honeypot — must remain empty
  hp_field: '',
};

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Please enter your full name (at least 2 characters).';
  if (!isValidIndianMobile(f.mobile)) e.mobile = 'Please enter a valid 10-digit Indian mobile number.';
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address, or leave it blank.';
  if (!f.city.trim() || f.city.trim().length < 2) e.city = 'Please enter your city or location.';
  if (!f.opportunity) e.opportunity = 'Please select an opportunity category.';
  if (!f.message.trim() || f.message.trim().length < 20) e.message = 'Please write a message (at least 20 characters).';
  if (!f.consent) e.consent = 'Please confirm your consent before submitting.';
  return e;
}

export default function JoinUs() {
  usePageMeta({
    title: 'Join Us — Mirantar | Drivers, Partners & Collaborators',
    description: 'Interested in working with Mirantar? Send us a WhatsApp enquiry for driving opportunities, tour partnerships, local experiences or business collaboration.',
  });

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [startTime] = useState(() => Date.now());
  useReveal();

  function set(key, value) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setTouched(true);

    // Honeypot check — bots fill hidden fields
    if (form.hp_field.trim()) return;

    // Time-delay check — real humans take more than 2 s
    if (Date.now() - startTime < 2000) return;

    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    const msg = buildJoinUsMessage({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      opportunity: form.opportunity,
      experience: form.experience.trim(),
      message: form.message.trim(),
    });
    window.open(createWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  }

  const cls = (k) => `input${touched && errors[k] ? ' !border-red-400 focus:ring-red-400/30' : ''}`;
  const err = (k) =>
    touched && errors[k] ? (
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
        <AlertCircle size={13} className="shrink-0" /> {errors[k]}
      </p>
    ) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-14 sm:pt-32 sm:pb-16 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Work with Mirantar</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Join Us</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            We are always open to conversations with drivers, local experience partners, travel collaborators and business contacts who share our commitment to comfortable, reliable and genuine travel.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-gold-200/80">
            We do not list specific vacancies, salaries, or guaranteed partnership terms. Send your details and we will be in touch if there is a fit.
          </p>
        </div>
      </section>

      {/* Opportunity cards */}
      <div className="container-x py-12 sm:py-16">
        <SectionHeader
          align="center"
          eyebrow="How you can work with us"
          title="Opportunities"
          sub="We are open to conversations across four broad areas. Select the one that best describes your interest in the form below."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPPORTUNITIES.map((opp) => {
            const Icon = OPPORTUNITY_ICONS[opp];
            return (
              <div key={opp} className="card reveal p-6 flex flex-col items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-gold-200">
                  <Icon size={20} />
                </span>
                <p className="font-semibold text-navy text-sm leading-snug">{opp}</p>
              </div>
            );
          })}
        </div>

        {/* Honest architecture notice */}
        <div className="mt-8 reveal rounded-2xl border border-gold/40 bg-gold-50 p-5 text-sm text-navy leading-relaxed">
          <p className="font-semibold">How this form works</p>
          <p className="mt-1 text-slate-600">
            Submitting this form opens WhatsApp with your details pre-filled as a message to Mirantar. There is no backend, database, or email service on this site — your application is sent as a WhatsApp message and read and responded to manually by the Mirantar team. You will not receive an automated confirmation email.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-8 card p-6 sm:p-8 reveal"
          aria-label="Join Mirantar enquiry form"
        >
          <SectionHeader align="left" eyebrow="Send an enquiry" title="Tell us about yourself" />

          {/* Honeypot — visually hidden, must stay empty */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="hp_field">Leave this field blank</label>
            <input
              id="hp_field"
              name="hp_field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.hp_field}
              onChange={(e) => set('hp_field', e.target.value)}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Full name */}
            <div>
              <label className="label" htmlFor="ju-name">Full Name *</label>
              <input
                id="ju-name"
                className={cls('name')}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                maxLength={100}
              />
              {err('name')}
            </div>

            {/* Mobile */}
            <div>
              <label className="label" htmlFor="ju-mobile">Mobile Number *</label>
              <input
                id="ju-mobile"
                className={cls('mobile')}
                value={form.mobile}
                onChange={(e) => set('mobile', e.target.value)}
                placeholder="10-digit Indian mobile"
                inputMode="tel"
                autoComplete="tel"
                maxLength={15}
              />
              {err('mobile')}
            </div>

            {/* Email (optional) */}
            <div>
              <label className="label" htmlFor="ju-email">
                Email <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="ju-email"
                type="email"
                className={cls('email')}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                maxLength={150}
              />
              {err('email')}
            </div>

            {/* City */}
            <div>
              <label className="label" htmlFor="ju-city">City / Location *</label>
              <input
                id="ju-city"
                className={cls('city')}
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="e.g. Pune, Nashik, Mumbai"
                maxLength={100}
              />
              {err('city')}
            </div>

            {/* Opportunity */}
            <div className="sm:col-span-2">
              <label className="label" htmlFor="ju-opportunity">Opportunity Category *</label>
              <select
                id="ju-opportunity"
                className={cls('opportunity')}
                value={form.opportunity}
                onChange={(e) => set('opportunity', e.target.value)}
              >
                <option value="">Select a category…</option>
                {OPPORTUNITIES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {err('opportunity')}
            </div>

            {/* Experience (optional) */}
            <div className="sm:col-span-2">
              <label className="label" htmlFor="ju-experience">
                Relevant Experience <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="ju-experience"
                className="input min-h-[90px]"
                value={form.experience}
                onChange={(e) => set('experience', e.target.value)}
                placeholder="Brief description of relevant experience, qualifications or background…"
                maxLength={800}
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="label" htmlFor="ju-message">Message *</label>
              <textarea
                id="ju-message"
                className={`input min-h-[120px]${touched && errors.message ? ' !border-red-400 focus:ring-red-400/30' : ''}`}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Tell us why you want to work with Mirantar and what you can offer…"
                maxLength={1200}
              />
              {err('message')}
              <p className="mt-1 text-right text-xs text-slate-400">{form.message.length}/1200</p>
            </div>

            {/* Consent */}
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="ju-consent"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-gold accent-[#d99a2b] focus:ring-gold/30"
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  aria-describedby="ju-consent-error"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  I consent to Mirantar contacting me via WhatsApp or phone regarding this enquiry. *
                </span>
              </label>
              {touched && errors.consent && (
                <p id="ju-consent-error" className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
                  <AlertCircle size={13} className="shrink-0" /> {errors.consent}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-gold mt-6 w-full !py-3.5">
            <MessageCircle size={19} /> Send Enquiry via WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            This opens WhatsApp with your details pre-filled. No automated response is sent — Mirantar will reply personally.
          </p>
        </form>
      </div>
    </>
  );
}
