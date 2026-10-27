import { businessConfig } from '../config/businessConfig.js';
import { getBookingAdvance, formatINR } from './pricing.js';

/*
 * WhatsApp helpers — the ONLY place a wa.me link is constructed.
 * Number source of truth: businessConfig.whatsapp.
 */

function digitsOnly(v) {
  return String(v || '').replace(/\D/g, '');
}

/** Normalised WhatsApp number (digits). Falls back safely, never crashes. */
export function getWhatsAppNumber() {
  const d = digitsOnly(businessConfig.whatsapp);
  if (!d || /REPLACE/.test(String(businessConfig.whatsapp))) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[whatsapp] businessConfig.whatsapp is not set yet.');
    }
    return d || '0000000000';
  }
  return d;
}

/** Display version of the business phone (used in UI text). */
export function getPhoneDisplay() {
  return businessConfig.phone;
}

/** tel: link for all Call buttons. Single source of truth. */
export function getCallLink() {
  return `tel:${digitsOnly(businessConfig.phone) || '0000000000'}`;
}

/**
 * Build a wa.me link for any message.
 * All WhatsApp buttons must use this helper.
 */
export function createWhatsAppLink(message) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message || businessConfig.whatsappMessage)}`;
}

/** Backwards-compatible wrapper (existing call sites keep working). */
export function whatsappLink(message) {
  return createWhatsAppLink(message);
}

/** Generic enquiry text for floating / "Ask on WhatsApp" buttons. */
export function generalEnquiry() {
  return `🙏 *Mirantar Enquiry*\n\n${businessConfig.whatsappMessage}\n\nThank you.\n\n${businessConfig.name}\n${businessConfig.tagline}`;
}

/** One-line acknowledgement of the booking-advance requirement. */
export function bookingAdvanceAcknowledgement() {
  return `I understand that a ${formatINR(getBookingAdvance())} booking advance is required to reserve the vehicle, and that it will be adjusted against the final trip fare.`;
}

export function buildBookingMessage({ name, mobile, tour, date, passengers, pickup, price, distanceInfo, remainingFare, message, offerCode, regularPrice, discountedPrice, bookingAdvance }) {
  const lines = [
    '🙏 *Mirantar Tour Booking Enquiry*',
    '',
    `*Name:* ${name}`,
    `*Mobile:* ${mobile}`,
    `*Tour:* ${tour}`,
    `*Travel Date:* ${date}`,
    `*Passengers:* ${passengers}`,
    `*Pickup Location:* ${pickup}`,
    '',
    `*Package Price:* ${price}`,
  ];
  if (distanceInfo) {
    lines.push(`*Distance:* ${distanceInfo}`);
  }
  if (offerCode) {
    lines.push('');
    lines.push('*Festive Offer Enquiry*');
    lines.push(`*Offer code:* ${offerCode}`);
    if (regularPrice !== null && regularPrice !== undefined) {
      lines.push(`*Regular package fare:* ${formatINR(regularPrice)}`);
    }
    if (discountedPrice !== null && discountedPrice !== undefined) {
      lines.push(`*Festive discount:* ${formatINR(500)}`);
      lines.push(`*Discounted package fare:* ${formatINR(discountedPrice)}`);
    }
    if (bookingAdvance !== null && bookingAdvance !== undefined) {
      lines.push(`*Booking advance:* ${formatINR(bookingAdvance)}`);
    }
    if (discountedPrice !== null && discountedPrice !== undefined && bookingAdvance !== null && bookingAdvance !== undefined) {
      lines.push(`*Remaining package balance after advance:* ${formatINR(Math.max(0, discountedPrice - bookingAdvance))}`);
    }
  }
  if (remainingFare) {
    lines.push(`*Remaining After Advance:* ${remainingFare}`);
  }
  lines.push('');
  if (message && message.trim()) {
    lines.push('*Additional Message:*', message.trim(), '');
  }
  lines.push(
    bookingAdvanceAcknowledgement(),
    '',
    'Please confirm availability and booking details.',
    '',
    'Thank you.',
    '',
    businessConfig.name,
    businessConfig.tagline,
  );
  return lines.join('\n');
}

export function buildCustomTripMessage({ name, phone, destination, date, passengers, pickup, duration, requirements }) {
  const lines = [
    '🙏 *Mirantar Custom Trip Enquiry*',
    '',
    `*Name:* ${name}`,
    `*Mobile:* ${phone}`,
    `*Destination:* ${destination}`,
    `*Travel Date:* ${date}`,
    `*Passengers:* ${passengers}`,
    `*Pickup Location:* ${pickup}`,
    `*Trip Duration:* ${duration}`,
    '',
  ];
  if (requirements && requirements.trim()) {
    lines.push('*Additional Requirements:*', requirements.trim(), '');
  }
  lines.push(bookingAdvanceAcknowledgement(), '', 'Please share a quotation and confirm availability.', '', 'Thank you.', '', businessConfig.name, businessConfig.tagline);
  return lines.join('\n');
}

/**
 * Build the WhatsApp message for a Join Us / partnership application.
 * No email, salary, vacancy count or partnership terms are mentioned.
 */
export function buildJoinUsMessage({ name, mobile, email, city, opportunity, experience, message }) {
  const lines = [
    '🤝 *Mirantar — Join Us Enquiry*',
    '',
    `*Name:* ${name}`,
    `*Mobile:* ${mobile}`,
  ];
  if (email && email.trim()) lines.push(`*Email:* ${email.trim()}`);
  lines.push(
    `*City / Location:* ${city}`,
    `*Opportunity:* ${opportunity}`,
    '',
  );
  if (experience && experience.trim()) {
    lines.push('*Relevant Experience:*', experience.trim(), '');
  }
  lines.push(
    '*Message:*',
    message.trim(),
    '',
    'I consent to Mirantar contacting me regarding this enquiry.',
    '',
    'Thank you.',
    '',
    businessConfig.name,
    businessConfig.tagline,
  );
  return lines.join('\n');
}

/**
 * Build the WhatsApp message for a customer review submission.
 * The owner reviews this in WhatsApp and decides whether to add it
 * to src/data/reviews.js after verifying the trip.
 */
export function buildReviewMessage({ name, rating, route, travelDate, review }) {
  const stars = '⭐'.repeat(Number(rating) || 0);
  const lines = [
    '✍️ *Mirantar — Customer Review Submission*',
    '',
    `*Name:* ${name}`,
    `*Rating:* ${stars} (${rating}/5)`,
    `*Trip / Route:* ${route}`,
  ];
  if (travelDate && travelDate.trim()) lines.push(`*Travel Date:* ${travelDate.trim()}`);
  lines.push(
    '',
    '*Review:*',
    review.trim(),
    '',
    'I consent to Mirantar publishing this review on their website.',
    '',
    'Thank you.',
    '',
    businessConfig.name,
    businessConfig.tagline,
  );
  return lines.join('\n');
}

export function isValidIndianMobile(v) {
  const d = String(v || '').replace(/\D/g, '');
  const m = d.length === 12 && d.startsWith('91') ? d.slice(2) : d;
  return /^[6-9]\d{9}$/.test(m);
}

export function isFutureOrToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + 'T00:00:00');
  return !Number.isNaN(d.getTime()) && d >= today;
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
