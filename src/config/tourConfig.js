/*
 * MIRANTAR TOUR CONTROL PANEL
 * Category lists and shared tour settings. Package prices live in
 * pricingConfig.js; package details live in src/data/ganpatiPackages.js.
 */

export const tourConfig = {
  categories: [
    'Religious & Spiritual',
    'Hill Stations & Nature',
    'Heritage & Forts',
    'Custom Trips',
  ],

  defaultMaxPassengers: 6,

  // Shared fare note shown under package / tour pricing site-wide.
  fareNote:
    'Package fare covers vehicle, fuel and professional driver. Toll, parking and halting charges, wherever applicable, are payable separately by the passenger.',

  // Shown wherever distance-based pricing is explained.
  distanceNote:
    'The included distance is measured on the vehicle’s total journey starting from its base location in Pune. Additional distance beyond the included limit is charged per kilometre as shown on each package.',
};
