export const PHONE_DISPLAY = '(425) 448-4998';
export const PHONE_TEL = '+14254484998';
export const LICENSE = 'SEATTPL783M6';
export const BUSINESS_NAME = 'Seattle Christmas Lights';
export const SITE_URL = 'https://lightseattle.com';

export const photos = [
  { src: '/images/work/tree-wraps-columns.webp', alt: 'Wrapped trees, columns and roofline lit in warm white' },
  { src: '/images/work/modern-roofline.webp', alt: 'Modern two story home with warm white roofline lights' },
  { src: '/images/work/porch-and-tree.webp', alt: 'Roofline, porch railing and wrapped tree in warm white' },
  { src: '/images/work/driveway-trees.webp', alt: 'Driveway trees and arbor wrapped in warm white lights' },
  { src: '/images/work/big-tree.webp', alt: 'Large tree fully wrapped in white lights' },
  { src: '/images/work/roofline-wreath.webp', alt: 'Roofline lights with a lit wreath over the front door' },
  { src: '/images/work/gables-white.webp', alt: 'Home with every gable outlined in white C9 bulbs' },
  { src: '/images/work/driveway-home.webp', alt: 'Roofline lights on a home set back from a long driveway' },
  { src: '/images/work/roofline-red-door.webp', alt: 'Two story roofline outlined in white C9 bulbs' },
  { src: '/images/work/tree-and-roofline.webp', alt: 'Wrapped front yard tree and roofline lights' },
  { src: '/images/work/garage-roofline.webp', alt: 'Garage and roofline lit with a wreath on the gable' },
  { src: '/images/work/red-white-roofline.webp', alt: 'Roofline lit in white with red accents' },
];

export const included = [
  'Commercial grade LED lights, warm white or color',
  'Clean install on rooflines, trees, bushes and walkways',
  'Free fixes if anything goes out during the season',
  'Takedown in January',
  'Storage until next year, in a bin labeled for your house',
];

export const steps = [
  {
    title: 'Send your address',
    body: 'Most quotes get done over the phone or by text. Bigger properties sometimes get a quick visit.',
  },
  {
    title: 'Approve your quote',
    body: 'Pick what you want lit and how. You get one flat price.',
  },
  {
    title: 'We install',
    body: 'We text you a heads up before we come. You do not need to be home.',
  },
];

export const faqs = [
  {
    q: 'When do installs happen?',
    a: 'Installs run from October through early December. Booking earlier gets you more date options.',
  },
  {
    q: 'When do the lights come down?',
    a: 'Takedown starts after New Year\'s and wraps up in January.',
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
    q: 'Will the clips hurt my roof or gutters?',
    a: 'No. Lights go up with plastic clips made for gutters and shingles.',
  },
  {
    q: 'Do you do businesses?',
    a: 'Yes. We do holiday lighting for storefronts, offices and HOA entrances too.',
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
  description: 'Christmas light installation, takedown and storage for homes and businesses in the Seattle area.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kenmore',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  areaServed: cities.map((c) => ({ '@type': 'City', name: `${c.name}, WA` })),
};
