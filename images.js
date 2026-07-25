// Default photography for the site, sourced from Lorem Picsum
// (https://picsum.photos) — a free image service that serves real,
// freely-licensed photography with no API key and no attribution required.
// Every URL below is "seeded" so the same seed always returns the same
// photo, which keeps the layout stable across reloads and deployments.
//
// These are neutral placeholders. Swap them for real branded photography
// any time via the /admin dashboard — an admin-uploaded photo always wins
// over the default shown here.

export function picsum(seed, width, height) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

// One default photo per event category (used in the ring gallery hero,
// the homepage category grid, and the Services page).
export const categoryImages = {
  weddings: picsum('vv-weddings', 800, 1000),
  corporate: picsum('vv-corporate', 800, 1000),
  dinners: picsum('vv-dinners', 800, 1000),
  fashion: picsum('vv-fashion', 800, 1000),
  birthdays: picsum('vv-birthdays', 800, 1000),
  launches: picsum('vv-launches', 800, 1000),
}

// One default photo per planner (used on directory cards + booking pages).
export const plannerImages = {
  'aria-costantini': picsum('vv-planner-aria', 800, 600),
  'summit-and-co': picsum('vv-planner-summit', 800, 600),
  'the-lantern-table': picsum('vv-planner-lantern', 800, 600),
  'noir-runway-studio': picsum('vv-planner-noir', 800, 600),
  'gilded-hour': picsum('vv-planner-gilded', 800, 600),
  'firstlook-activations': picsum('vv-planner-firstlook', 800, 600),
  'ivory-and-oak': picsum('vv-planner-ivory', 800, 600),
  'apex-conclave': picsum('vv-planner-apex', 800, 600),
  'the-glass-room': picsum('vv-planner-glassroom', 800, 600),
}

// Wide banners for page heroes.
export const bannerImages = {
  home: picsum('vv-home-hero', 1600, 900),
  about: picsum('vv-about-hero', 1600, 700),
  services: picsum('vv-services-hero', 1600, 700),
  gallery: picsum('vv-gallery-hero', 1600, 700),
  contact: picsum('vv-contact-hero', 1600, 700),
}

// A broader spread of event photography for the public Gallery page.
export const galleryImages = [
  { id: 'g1', src: picsum('vv-gallery-1', 700, 900), category: 'Luxury Weddings' },
  { id: 'g2', src: picsum('vv-gallery-2', 700, 500), category: 'Corporate Summits' },
  { id: 'g3', src: picsum('vv-gallery-3', 700, 700), category: 'Private Dinners' },
  { id: 'g4', src: picsum('vv-gallery-4', 700, 900), category: 'Fashion Shows' },
  { id: 'g5', src: picsum('vv-gallery-5', 700, 500), category: 'Milestone Birthdays' },
  { id: 'g6', src: picsum('vv-gallery-6', 700, 700), category: 'Brand Launches' },
  { id: 'g7', src: picsum('vv-gallery-7', 700, 500), category: 'Luxury Weddings' },
  { id: 'g8', src: picsum('vv-gallery-8', 700, 900), category: 'Corporate Summits' },
  { id: 'g9', src: picsum('vv-gallery-9', 700, 700), category: 'Private Dinners' },
]
