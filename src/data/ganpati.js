import { ganpatiPackages, GANPATI_INCLUDED, GANPATI_EXCLUDED } from './ganpatiPackages.js';
import { getPackagePricing, formatINR, distancePolicyText } from '../utils/pricing.js';

/*
 * Backwards-compatible Ganpati package list.
 * Source data: src/data/ganpatiPackages.js
 * Prices: resolved from src/config/pricingConfig.js (no hard-coded fares).
 */
export const GANPATI_PACKAGES = ganpatiPackages.map((p) => {
  const pricing = getPackagePricing(p.regularPriceKey);
  return {
    slug: p.slug,
    name: p.name,
    temples: p.temples.join(' + '),
    regularPrice: pricing.regularPrice,
    includedKm: pricing.includedKm,
    extraKmRate: pricing.extraKmRate,
    enabled: pricing.enabled,
    capacity: `Up to ${p.maxPassengers} passengers`,
    tag: p.tag,
    note: p.climbWarning || p.description,
  };
}).filter((p) => p.enabled);

export { GANPATI_INCLUDED, GANPATI_EXCLUDED, formatINR, distancePolicyText };

export function getGanpatiBySlug(slug) {
  return GANPATI_PACKAGES.find((p) => p.slug === slug);
}
