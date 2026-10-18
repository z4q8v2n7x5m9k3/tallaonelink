// Shop configuration for the Veloura Salon OneLink.

import { PUBLIC_SITE_URL } from '../../lib/public-site-url'

export type ContactPersonLabel = 'Showroom' | 'Booking' | 'Salon'

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string
  phoneDisplay: string
  whatsappE164: string
}

export const shopConfig = {
  name: 'Talla Jewellers',
  tagline: 'Fine Jewellery & Diamonds',
  taglineShort: 'Gold • Diamonds • Polki • Silver',
  serviceTagline: 'Since 1986 • 100% BIS Hallmarked',
  snapshotLocationLine: '4 Showrooms across Jammu & Kashmir',
  snapshotServicesLine: 'Gold • Diamonds • Polki • ZAVI Silver',
  snapshotHours: 'Daily 10:30 AM - 8:00 PM',
  url: PUBLIC_SITE_URL,
  cardType: 'B2C' as const,
  keywordBadges: ['Since 1986', '100% BIS Hallmarked'] as string[],

  contact: {
    phones: ['918716900000'],
    email: 'care@tallajewellers.com',
    address: '4 A/B, Gandhi Nagar, Jammu, Jammu & Kashmir 180004',
    locationLine: 'Gandhi Nagar, Jammu (4 Showrooms in J&K)',
    mapQuery: 'Talla Jewellers Gandhi Nagar Jammu',
    storeHours: 'Daily 10:30 AM - 8:00 PM',
    storeHoursStatus: 'Open daily',
    officePhone: '8716900000',
    clientPhone: '8716900000',
    clientPhoneE164: '918716900000',
    officePhoneE164: '918716900000',
  },

  branches: [
    { name: 'Talla Jewellers — Gandhi Nagar', address: '4 A/B, Gandhi Nagar, near Gole Market, Jammu 180004', phone: '+91 87169 00000', mapQuery: 'Talla Jewellers 4 A/B Gandhi Nagar Jammu' },
    { name: 'Talla Jewellers — Lakhdata Bazar', address: '48, Lakhdata Bazar, Jammu 180001', phone: '+91 87169 00000', mapQuery: 'Talla Jewellers 48 Lakhdata Bazar Jammu' },
    { name: 'Talla Jewellers — Janipur', address: "Near Domino's Pizza, Patoli, Janipur, Jammu 180007", phone: '+91 87169 00000', mapQuery: "Talla Jewellers near Domino's Pizza Patoli Janipur Jammu" },
    { name: 'Talla Jewellers — Udhampur', address: 'Dhar Road, Indra Nagar, Udhampur, Ladan 182101', phone: '+91 87169 00000', mapQuery: 'Talla Jewellers Dhar Road Indra Nagar Udhampur' },
  ],

  contactPersons: [
    { label: 'Showroom' as ContactPersonLabel, phoneE164: '918716900000', phoneDisplay: '+91 87169 00000', whatsappE164: '918716900000' },
    { label: 'Booking' as ContactPersonLabel, phoneE164: '918716900000', phoneDisplay: '+91 87169 00000', whatsappE164: '918716900000' },
  ] as ContactPerson[],

  whatsapp: {
    defaultPhone: '8716900000',
    defaultMessage: 'Hi Talla Jewellers, I would like to inquire about a jewellery consultation.',
    showSelector: false,
    selectorPersons: ['Showroom'] as ContactPersonLabel[],
  },

  social: {
    facebook: 'https://www.facebook.com/tallajewellers/',
    instagram: 'https://www.instagram.com/tallajewellers/',
    instagramJammu: '',
    twitter: '',
    linkedin: '',
    zomato: '',
  },

  trustBadges: ['Since 1986', '100% BIS Hallmarked', 'Certified Diamonds'] as string[],
  brands: [
    { name: 'Gold', tagline: '100% BIS Hallmarked 22K & 18K', logo: '' },
    { name: 'Diamonds', tagline: 'Certified Natural Diamonds', logo: '' },
    { name: 'Polki', tagline: 'Royal Heritage Bridal Polki', logo: '' },
    { name: 'ZAVI Silver', tagline: 'Modern 925 Pure Sterling Silver', logo: '' },
  ],

  about: {
    title: 'Welcome to Talla Jewellers',
    shortDescription: 'Crafting timeless elegance and heirloom jewellery since 1986. Known for uncompromised purity, master craftsmanship, and being Jammu’s most cherished diamond & bridal jewellery destination.',
  },
  menuUrl: '/services',

  payment: {
    upiId: 'talla.jewellers@upi', upiId2: '', upiName: 'Talla Jewellers', upiQrImageUrl: '', scannerImage: '',
    bank: { bankName: 'J&K Bank', accountNumberMasked: 'XXXX XXXX 1986', ifsc: 'JAKA0DEMO01', accountHolder: 'TALLA JEWELLERS' },
    showScanner: false, showDownloadQR: false,
  },

  google: {
    placeId: 'talla-jewellers-jammu',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Talla+Jewellers+Jammu',
    reviewsUrl: '#reviews',
    isDemo: false,
  },

  seo: {
    title: 'Talla Jewellers | Fine Jewellery & Diamonds Since 1986',
    description: 'Talla Jewellers OneLink — Explore Gold, Diamonds, Polki, and ZAVI Silver across four showrooms.',
    keywords: 'Talla Jewellers, Gold Jewellery Jammu, Diamond Jewellery, Polki, ZAVI Silver',
  },

  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  sections: { showAbout: true, showMenu: false, showServices: true, showGallery: true, showReviews: true, showSocialConnect: true, showContactCard: true, showFooter: true },
  assets: { logo: '/talla/elegant-gold-t-emblem.png', cover: '/talla/talla-logo.jpg', gallery: '/talla/', qr: '' },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
}

export type ShopConfig = typeof shopConfig
