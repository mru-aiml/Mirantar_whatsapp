import { useState } from 'react';
import { Star, MessageCircle, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { buildReviewMessage, createWhatsAppLink, isValidIndianMobile } from '../utils/whatsapp.js';
import { getApprovedReviews, getAverageRating, getReviewCount } from '../data/reviews.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { useReveal } from '../hooks/useReveal.js';

/*
 * ⚠️  REVIEW MODERATION ARCHITECTURE — READ BEFORE MODIFYING
 * ─────────────────────────────────────────────────────────────
 * This site has NO backend, database, or auto-publish pipeline.
 *
 * Review submission flow:
 *   1. Customer fills this form → WhatsApp message sent to Mirantar.
 *   2. Owner verifies the trip against WhatsApp booking history.
 *   3. If genuine, owner adds the review to src/data/reviews.js and deploys.
 *   4. The review appears on this page only after that manual step.
 *
 * Average rating and review count are calculated ONLY from entries in
 * APPROVED_REVIEWS where approved === true. No fake data is ever shown.
 *
 * For scalable moderation, see the comment in src/data/reviews.js.
 */

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

function StarRating({ value, onChange, readonly = false, size = 24 }) {
  const [hovered, setHovered] = useState(0);
  const display = readonly ? value : (hovered || value);
  return (
    <div className="flex gap-1" role={readonly ? 'img' : 'group'} aria-label={readonly ? `${value} out of 5 stars` : 'Select a star rating'}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type={readonly ? 'button' : 'button'}
          disabled={readonly}
          aria-label={readonly ? undefined : `${s} star${s > 1 ? 's' : ''} — ${STAR_LABELS[s]}`}
          onClick={() => !readonly && onChange && onChange(s)}
          onMouseEnter={() => !readonly && setHovered(s)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`transition-transform ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm'}`}
        >
          <Star
            size={size}
            className={`transition-colors ${s <= display ? 'fill-gold text-gold' : 'text-slate-300'}`}
            fill={s <= display ? '#d99a2b' : 'none'}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="card reveal p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-white text-sm tracking-wider">
            {review.initials}
          </span>
          <div>
            <p className="font-semibold text-navy text-sm">{review.name}</p>
            {review.travelDate && <p className="text-xs text-slate-500">{review.travelDate}</p>}
          </div>
        </div>
        <StarRating value={review.rating} readonly size={16} />
      </div>
      {review.route && (
        <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">{review.route}</p>
      )}
      <p className="text-sm text-slate-600 leading-relaxed">"{review.review}"</p>
    </article>
  );
}

const INITIAL_FORM = {
  name: '',
  rating: 0,
  route: '',
  travelDate: '',
  review: '',
  consent: false,
  hp_field: '',
};

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!f.rating || f.rating < 1 || f.rating > 5) e.rating = 'Please select a star rating from 1 to 5.';
  if (!f.route.trim() || f.route.trim().length < 3) e.route = 'Please enter the trip route or destination.';
  if (!f.review.trim() || f.review.trim().length < 30) e.review = 'Please write a review (at least 30 characters).';
  if (!f.consent) e.consent = 'Please confirm your consent before submitting.';
  return e;
}

export default function Reviews() {
  usePageMeta({
    title: 'Reviews — Mirantar | Customer Experiences',
    description: 'Read genuine customer reviews of Mirantar private tours from Pune. Submit your own experience after travelling with us.',
  });

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(() => Date.now());
  useReveal();

  const approvedReviews = getApprovedReviews();
  const avgRating = getAverageRating();
  const reviewCount = getReviewCount();

  function set(key, value) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setTouched(true);

    // Honeypot
    if (form.hp_field.trim()) return;
    // Time-delay
    if (Date.now() - startTime < 2000) return;

    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    const msg = buildReviewMessage({
      name: form.name.trim(),
      rating: form.rating,
      route: form.route.trim(),
      travelDate: form.travelDate.trim(),
      review: form.review.trim(),
    });
    setSubmitted(true);
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
        <div className="container-x relative">
          <p className="eyebrow !text-gold-200">Customer Experiences</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Reviews</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Genuine reviews from passengers who have travelled with Mirantar. Every review is verified by us before it appears here.
          </p>
          {reviewCount > 0 && avgRating !== null && (
            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <StarRating value={Math.round(avgRating)} readonly size={20} />
              <span className="font-display font-bold text-2xl text-white">{avgRating}</span>
              <span className="text-sm text-white/70">from {reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </section>

      <div className="container-x py-12 sm:py-16 flex flex-col gap-12">

        {/* Approved reviews section */}
        {approvedReviews.length > 0 ? (
          <section aria-label="Approved customer reviews">
            <SectionHeader
              align="left"
              eyebrow={`${reviewCount} verified review${reviewCount !== 1 ? 's' : ''}`}
              title="What our passengers say"
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {approvedReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        ) : (
          <section className="reveal rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center" aria-label="No reviews yet">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream mx-auto">
              <Star size={30} className="text-gold-600" />
            </span>
            <h2 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-navy">Reviews coming soon</h2>
            <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
              We have not published any reviews yet. All submitted reviews are read and verified by Mirantar before appearing here — we never publish unverified or automatically collected ratings.
            </p>
            <p className="mt-2 max-w-lg mx-auto text-xs text-slate-500">
              If you have travelled with us, use the form below to share your experience. We appreciate every genuine review.
            </p>
          </section>
        )}

        {/* Moderation notice */}
        <div className="reveal rounded-2xl border border-gold/30 bg-gold-50 p-5 flex gap-3">
          <ShieldCheck size={20} className="shrink-0 text-gold-600 mt-0.5" />
          <div className="text-sm text-navy leading-relaxed">
            <p className="font-semibold">How reviews work at Mirantar</p>
            <p className="mt-1 text-slate-600">
              Every submitted review is sent to us via WhatsApp. We verify the trip against our booking records before manually adding the review to our website. This means reviews may take a few days to appear, but every published review is genuine and verified by us.
            </p>
            <p className="mt-2 text-slate-600">
              We do not use automated review platforms, third-party rating widgets, or unverified ratings aggregators. The average rating and review count shown above are calculated only from verified reviews published here.
            </p>
          </div>
        </div>

        {/* Submit a review */}
        <section aria-label="Submit a review">
          <SectionHeader
            align="center"
            eyebrow="Share your experience"
            title="Submit a Review"
            sub="Travelled with Mirantar? We'd love to hear from you. Your review goes to us on WhatsApp — after we verify the trip, it may be published here."
          />

          {submitted ? (
            <div className="mt-8 reveal card p-8 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mx-auto">
                <ShieldCheck size={30} className="text-green-600" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-navy">Thank you!</h2>
              <p className="mt-3 max-w-md mx-auto text-sm text-slate-600 leading-relaxed">
                WhatsApp should have opened with your review pre-filled. Once we verify your trip, your review may appear on this page within a few days. We appreciate your feedback.
              </p>
              <button
                onClick={() => { setForm(INITIAL_FORM); setErrors({}); setTouched(false); setSubmitted(false); }}
                className="btn-outline-navy mt-5"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-8 card p-6 sm:p-8 reveal max-w-2xl mx-auto"
              aria-label="Customer review submission form"
            >
              {/* Architecture notice */}
              <div className="mb-6 flex gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5 text-slate-400" />
                <span>Submitting this form opens WhatsApp with your review pre-filled. Reviews are <strong>not published automatically</strong> — Mirantar verifies each one before it appears on this page.</span>
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="rv_hp">Leave this field blank</label>
                <input
                  id="rv_hp"
                  name="hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.hp_field}
                  onChange={(e) => set('hp_field', e.target.value)}
                />
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="label" htmlFor="rv-name">Your Name *</label>
                  <input
                    id="rv-name"
                    className={cls('name')}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="First name or display name"
                    autoComplete="given-name"
                    maxLength={80}
                  />
                  <p className="mt-1 text-xs text-slate-400">We do not display email addresses or phone numbers.</p>
                  {err('name')}
                </div>

                {/* Star rating */}
                <div>
                  <label className="label" id="rv-rating-label">Star Rating *</label>
                  <div className="flex items-center gap-4 mt-2">
                    <StarRating
                      value={form.rating}
                      onChange={(v) => set('rating', v)}
                      size={30}
                    />
                    {form.rating > 0 && (
                      <span className="text-sm font-semibold text-gold-600">{STAR_LABELS[form.rating]}</span>
                    )}
                  </div>
                  {err('rating')}
                </div>

                {/* Route */}
                <div>
                  <label className="label" htmlFor="rv-route">Trip Route / Destination *</label>
                  <input
                    id="rv-route"
                    className={cls('route')}
                    value={form.route}
                    onChange={(e) => set('route', e.target.value)}
                    placeholder="e.g. Pune to Shirdi, Lonavala day trip"
                    maxLength={120}
                  />
                  {err('route')}
                </div>

                {/* Travel date (optional) */}
                <div>
                  <label className="label" htmlFor="rv-date">
                    Travel Date <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="rv-date"
                    className="input"
                    value={form.travelDate}
                    onChange={(e) => set('travelDate', e.target.value)}
                    placeholder="e.g. October 2026"
                    maxLength={40}
                  />
                </div>

                {/* Written review */}
                <div>
                  <label className="label" htmlFor="rv-review">Your Review *</label>
                  <textarea
                    id="rv-review"
                    className={`input min-h-[140px]${touched && errors.review ? ' !border-red-400 focus:ring-red-400/30' : ''}`}
                    value={form.review}
                    onChange={(e) => set('review', e.target.value)}
                    placeholder="Describe your experience travelling with Mirantar — vehicle, driver, journey comfort, punctuality, etc."
                    maxLength={1000}
                  />
                  <p className="mt-1 flex justify-between text-xs text-slate-400">
                    <span>Minimum 30 characters</span>
                    <span>{form.review.length}/1000</span>
                  </p>
                  {err('review')}
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      id="rv-consent"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#d99a2b]"
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      aria-describedby="rv-consent-error"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I consent to Mirantar publishing this review on their website after verification. *
                    </span>
                  </label>
                  {touched && errors.consent && (
                    <p id="rv-consent-error" className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
                      <AlertCircle size={13} className="shrink-0" /> {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-gold mt-6 w-full !py-3.5">
                <MessageCircle size={19} /> Submit Review via WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                Opens WhatsApp with your review pre-filled. Reviews are not published automatically — Mirantar verifies each one.
              </p>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
