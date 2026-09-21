import { ganpatiPackages, GANPATI_INCLUDED, GANPATI_EXCLUDED } from './ganpatiPackages.js';
import { getPackagePricing, isLaunchOfferEnabled, formatINR, distancePolicyText } from '../utils/pricing.js';

/*
 * Backwards-compatible Ganpati package list.
 * Source data: src/data/ganpatiPackages.js
 * Prices: resolved from src/config/pricingConfig.js (no hard-coded fares).
 * NOTE: there is no secondary discount tier — only the regular price
 * and (optionally) the Ganpati launch price from pricingConfig.
 */
export const GANPATI_PACKAGES = ganpatiPackages.map((p) => {
  const pricing = getPackagePricing(p.regularPriceKey);
  return {
    slug: p.slug,
    name: p.name,
    temples: p.temples.join(' + '),
    regularPrice: pricing.regularPrice,
    launchPrice: pricing.launchPrice,
    includedKm: pricing.includedKm,
    extraKmRate: pricing.extraKmRate,
    enabled: pricing.enabled,
    capacity: `Up to ${p.maxPassengers} passengers`,
    tag: p.tag,
    note: p.climbWarning || p.description,
  };
}).filter((p) => p.enabled);

export { GANPATI_INCLUDED, GANPATI_EXCLUDED, formatINR, isLaunchOfferEnabled, distancePolicyText };

export function getGanpatiBySlug(slug) {
  return GANPATI_PACKAGES.find((p) => p.slug === slug);
}
