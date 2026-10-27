/**
 * MIRANTAR — Approved customer reviews.
 *
 * HOW TO ADD A REVIEW:
 * ─────────────────────────────────────────────────────────────────────────
 * 1. A customer submits the review form at /reviews. This sends a WhatsApp
 *    message to the Mirantar business number with the customer's review.
 * 2. The owner verifies the trip (cross-check booking records on WhatsApp).
 * 3. If genuine and appropriate, add an entry to the APPROVED_REVIEWS array
 *    below and deploy the updated site.
 * 4. If the review is not verified or not appropriate, do not add it.
 *
 * NEVER publish a review automatically or without owner approval.
 * NEVER include customer phone numbers or email addresses here.
 * NEVER invent, fabricate or modify review content.
 *
 * FIELDS:
 *   id          — unique integer, increment for each new review
 *   name        — customer's first name or display name (as they provided)
 *   initials    — 1–2 letters for the avatar fallback (derived from name)
 *   rating      — integer 1–5
 *   route       — trip route or destination (e.g. "Pune to Shirdi")
 *   travelDate  — approximate month/year as a string, e.g. "October 2026"
 *   review      — the customer's written review, verbatim
 *   approved    — must be true for a review to be displayed
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Backend recommendation (for scalable moderation):
 *   Use Firebase Firestore with two collections:
 *     review_submissions  — stores unmoderated submissions (server-side)
 *     approved_reviews    — stores owner-approved reviews (served to frontend)
 *   The owner uses a simple admin UI (or direct Firestore console) to approve
 *   submissions, moving them from review_submissions → approved_reviews.
 *   ~4 hours to implement with the Firebase plugin already in this workspace.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** @type {Array<{id:number,name:string,initials:string,rating:number,route:string,travelDate:string,review:string,approved:boolean}>} */
export const APPROVED_REVIEWS = [
  // No approved reviews yet. Once the owner verifies and approves real customer
  // reviews received via WhatsApp, add them here following the format above.
  //
  // Example (remove the comment markers when adding a real review):
  // {
  //   id: 1,
  //   name: 'Priya S.',
  //   initials: 'PS',
  //   rating: 5,
  //   route: 'Pune to Shirdi',
  //   travelDate: 'October 2026',
  //   review: 'Very comfortable journey. Driver was polite and punctual.',
  //   approved: true,
  // },
];

/** Returns only approved reviews, sorted newest-first by id. */
export function getApprovedReviews() {
  return APPROVED_REVIEWS.filter((r) => r.approved === true).sort((a, b) => b.id - a.id);
}

/** Calculates average rating from approved reviews only. Returns null if none. */
export function getAverageRating() {
  const reviews = getApprovedReviews();
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/** Returns a count of approved reviews. */
export function getReviewCount() {
  return getApprovedReviews().length;
}
