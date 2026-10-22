export const PHONE_DISPLAY = '(425) 448-4998';
export const PHONE_TEL = '+14254484998';
export const LICENSE = 'SEATTPL783M6';
export const BUSINESS_NAME = 'Seattle Christmas Lights';
export const SITE_URL = 'https://lightseattle.com';

export const photos = [
  { src: '/images/work/white-c9-wreath.webp', alt: 'Two story home with warm white C9 roofline lights and a wreath' },
  { src: '/images/work/tree-wraps-columns.webp', alt: 'Wrapped trees, columns and roofline lit in warm white' },
  { src: '/images/work/white-gables-garage.webp', alt: 'Every gable and the garage outlined in warm white lights' },
  { src: '/images/work/modern-roofline.webp', alt: 'Modern two story home with warm white roofline lights' },
  { src: '/images/work/porch-and-tree.webp', alt: 'Roofline, porch railing and wrapped tree in warm white' },
  { src: '/images/work/white-craftsman.webp', alt: 'Craftsman home with warm white lights on every roofline' },
  { src: '/images/work/big-tree.webp', alt: 'Large tree fully wrapped in warm white lights' },
  { src: '/images/work/roofline-wreath.webp', alt: 'Roofline lights with a lit wreath over the front door' },
  { src: '/images/work/white-two-homes.webp', alt: 'Two story home with warm white roofline and gable lights' },
  { src: '/images/work/roofline-red-door.webp', alt: 'Two story roofline outlined in warm white C9 bulbs' },
  { src: '/images/work/tree-and-roofline.webp', alt: 'Wrapped front yard tree and warm white roofline lights' },
  { src: '/images/work/driveway-home.webp', alt: 'Warm white roofline lights on a home set back from a long driveway' },
];

export const included = [
  {
    title: 'Professional install',
    body: 'Our crew handles the ladders and the roof. Lights get cut to fit the house so every line is clean.',
  },
  {
    title: 'Commercial grade lights',
    body: 'Bright LED bulbs, evenly spaced, built to hold up to Seattle rain.',
  },
  {
    title: 'Free fixes all season',
    body: 'If a section goes out, call or text and we come fix it at no charge.',
  },
  {
    title: 'Takedown in January',
    body: 'Everything comes down after the holidays.',
  },
  {
    title: 'Storage included',
    body: 'The lights get packed in a bin labeled for the house and stored until next Christmas.',
  },
  {
    title: 'Leased for the season',
    body: 'The lights are ours, so there is nothing to buy, untangle or keep in the garage.',
  },
];

export const steps = [
  {
    title: 'Send your address',
    body: 'Most quotes get done over the phone or by text. Bigger properties sometimes get a quick visit.',
  },
  {
    title: 'Approve your quote',
    body: 'Pick what gets lit. One flat price for the season.',
  },
  {
    title: 'We hang the lights',
    body: 'We text a heads up before we come. Nobody needs to be home.',
  },
];

export const faqs = [
  {
    q: 'When do installs happen?',
    a: 'Installs run from October through early December. Booking earlier gets more date options.',
  },
  {
    q: 'When do the lights come down?',
    a: "Takedown starts after New Year's and wraps up in January.",
  },
  {
    q: 'Do I have to buy the lights?',
    a: 'No. The lights are leased for the season. We hang them, take them down in January and store them for next Christmas.',
  },
  {
    q: 'Do I need to be home?',
    a: 'No. We just need access to the outside of the house and an outdoor outlet.',
  },
  {
    q: 'What if a section goes out?',
    a: 'Call or text and we will come fix it at no charge.',
  },
  {
    q: 'Do you do businesses?',
    a: 'Yes. We hang holiday lights for storefronts, offices and HOA entrances too.',
  },
];

export const cities = [
  { name: 'Seattle', path: 'seattle', nearby: ['shoreline', 'mercer-island', 'bellevue', 'kirkland'] },
  { name: 'Bellevue', path: 'bellevue', nearby: ['kirkland', 'mercer-island', 'medina', 'clyde-hill'] },
  { name: 'Kirkland', path: 'kirkland', nearby: ['bellevue', 'bothell', 'kenmore', 'woodinville'] },
  { name: 'Bothell', path: 'bothell', nearby: ['kenmore', 'woodinville', 'lake-forest-park', 'lynnwood'] },
  { name: 'Kenmore', path: 'kenmore', nearby: ['bothell', 'lake-forest-park', 'kirkland', 'woodinville'] },
  { name: 'Woodinville', path: 'woodinville', nearby: ['bothell', 'kirkland', 'kenmore'] },
  { name: 'Lake Forest Park', path: 'lake-forest-park', nearby: ['kenmore', 'shoreline', 'bothell', 'seattle'] },
  { name: 'Everett', path: 'everett', nearby: ['lynnwood', 'shoreline', 'bothell'] },
  { name: 'Lynnwood', path: 'lynnwood', nearby: ['shoreline', 'everett', 'bothell', 'kenmore'] },
  { name: 'Shoreline', path: 'shoreline', nearby: ['seattle', 'lake-forest-park', 'lynnwood', 'kenmore'] },
  { name: 'Mercer Island', path: 'mercer-island', nearby: ['bellevue', 'seattle', 'kirkland'] },
  { name: 'Medina', path: 'medina', nearby: ['bellevue', 'clyde-hill', 'hunts-point', 'kirkland'] },
  { name: 'Clyde Hill', path: 'clyde-hill', nearby: ['bellevue', 'medina', 'hunts-point', 'kirkland'] },
  { name: 'Hunts Point', path: 'hunts-point', nearby: ['medina', 'clyde-hill', 'bellevue', 'kirkland'] },
];

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  telephone: PHONE_TEL,
  image: `${SITE_URL}/images/og-image.jpg`,
  description: 'Professional holiday light installation for homes and businesses in the Seattle area. Takedown and storage included.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kenmore',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  areaServed: cities.map((c) => ({ '@type': 'City', name: `${c.name}, WA` })),
};
