import { PUBLIC_SITE_URL } from '../lib/public-site-url'

export const siteConfig = {
  name: 'Talla Jewellers',
  tagline: 'Fine Jewellery & Diamonds',
  url: PUBLIC_SITE_URL,
  contact: { phones: ['918716900000'], email: 'care@tallajewellers.com', address: '4 A/B, Gandhi Nagar, Jammu, Jammu & Kashmir 180004', mapQuery: 'Talla Jewellers Gandhi Nagar Jammu', storeHours: 'Daily 10:30 AM - 8:00 PM', officePhone: '8716900000' },
  contactPersons: [
    { label: 'Showroom' as const, phoneE164: '918716900000', phoneDisplay: '+91 87169 00000', whatsappE164: '918716900000' },
    { label: 'Booking' as const, phoneE164: '918716900000', phoneDisplay: '+91 87169 00000', whatsappE164: '918716900000' },
  ],
  whatsapp: { defaultPhone: '8716900000', defaultMessage: 'Hi Talla Jewellers, I would like to inquire about your jewellery collections.' },
  trustBadges: ['Since 1960', '100% BIS Hallmarked', '4 Showrooms'],
  brands: [{ name: 'Gold', tagline: '', logo: '' }, { name: 'Diamonds', tagline: '', logo: '' }, { name: 'Polki', tagline: '', logo: '' }, { name: 'ZAVI Silver', tagline: '', logo: '' }],
  about: {
    title: 'Welcome to Talla Jewellers',
    shortDescription: 'Crafting timeless elegance and heirloom jewellery since 1960. Known for purity, master craftsmanship, and being Jammu’s most trusted diamond & bridal destination.',
    fullDescription: 'Talla Jewellers brings generations of heirloom artistry in gold, diamonds, polki, and 925 sterling silver across four showrooms.',
  },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
  social: { facebook: 'https://www.facebook.com/tallajewellers/', instagram: 'https://www.instagram.com/tallajewellers/', twitter: '', linkedin: '' },
  seo: { title: 'Talla Jewellers | Fine Jewellery & Diamonds Since 1960', description: 'Explore Gold, Certified Diamonds, Polki and ZAVI Silver across four showrooms in Jammu & Kashmir.', keywords: 'Talla Jewellers, Gold Jewellery Jammu, Diamond Jewellery, Polki, ZAVI Silver' },
  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  google: { placeId: 'talla-jewellers-jammu', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Talla+Jewellers+Jammu', reviewsUrl: '#reviews', isDemo: false },
}

export type SiteConfig = typeof siteConfig
