export interface ServiceItem { id: string; name: string; description?: string; price?: string; note?: string; category: ServiceCategoryKey }
export type ServiceCategoryKey = 'hairWomen' | 'hairMen' | 'hairTreatments' | 'beauty' | 'nails' | 'makeup' | 'hairSystems'
const item = (id: string, name: string, category: ServiceCategoryKey, price = 'Price on Consultation'): ServiceItem => ({ id, name, category, price })
export interface ServiceCategoryConfig { name: string; shortDescription: string; icon: string; image: string; items: ServiceItem[] }
const images: Record<ServiceCategoryKey, string> = {
  hairWomen: '/femina/veloura-hair-editorial.png',
  hairTreatments: '/femina/veloura-hair-editorial.png',
  beauty: '/femina/veloura-skin-editorial.png',
  hairSystems: '/femina/veloura-skin-editorial.png',
  nails: '/femina/veloura-beauty-editorial.png',
  makeup: '/femina/veloura-beauty-editorial.png',
  hairMen: '/femina/veloura-salon-interior.png',
}

export const serviceCategories: Record<ServiceCategoryKey, ServiceCategoryConfig> = {
  hairWomen: { name: 'Hair', shortDescription: 'Cuts, colour, styling and everyday hair care.', icon: '✂', image: images.hairWomen, items: [item('hair-1','Hair Cut + Head Wash + Blow Dry','hairWomen'),item('hair-2','Global Hair Colour — Matrix','hairWomen','₹3,299'),item('hair-3','Root Touch-Up — Matrix','hairWomen','₹1,799'),item('hair-4','Head Massage','hairWomen','₹599'),item('hair-5','Styling','hairWomen'),item('hair-6','Smoothening / Rebonding — Matrix','hairWomen','₹6,799'),item('hair-7','Keratin — Matrix','hairWomen','₹3,499')] },
  hairTreatments: { name: 'Hair Treatments', shortDescription: 'Professional repair, spa and smoothing treatments.', icon: '◇', image: images.hairTreatments, items: [item('treat-1','Hair Spa — Matrix','hairTreatments','₹1,399'),item('treat-2','Keratin — Matrix','hairTreatments','₹3,499'),item('treat-3','Smoothening / Rebonding — Matrix','hairTreatments','₹6,799'),item('treat-4','Hair Colour','hairTreatments'),item('treat-5','Root Touch-Up — Matrix','hairTreatments','₹1,799')] },
  beauty: { name: 'Beauty', shortDescription: 'Threading, waxing, polishing and essential beauty care.', icon: '○', image: images.beauty, items: [item('beauty-1','Threading + Upper Lips','beauty'),item('beauty-2','Bikini Wax — Honey / Rica','beauty'),item('beauty-3','Full Arms + Full Legs + Underarms Wax','beauty'),item('beauty-4','Full Arms + Half Legs + Underarms Wax','beauty'),item('beauty-5','Full Body Wax — Honey / Rica','beauty'),item('beauty-6','Full Body Polishing','beauty'),item('beauty-7','Clean-Up','beauty'),item('beauty-8','Facial + Bleach','beauty')] },
  hairSystems: { name: 'Skin', shortDescription: 'Hydra facials, clean-ups and targeted facial care.', icon: '✦', image: images.hairSystems, items: [item('skin-1','Hydra Facial — Basic','hairSystems','₹1,599'),item('skin-2','Hydra Facial — Advanced','hairSystems'),item('skin-3','Fruit Clean-Up','hairSystems'),item('skin-4','Fruit Facial + Bleach','hairSystems'),item('skin-5','O3 Facial + Bleach','hairSystems')] },
  nails: { name: 'Nails', shortDescription: 'Manicure, pedicure and polished nail care.', icon: '□', image: images.nails, items: [item('nails-1','Basic Manicure + Pedicure','nails'),item('nails-2','Advanced Manicure + Pedicure','nails','₹1,799')] },
  makeup: { name: 'Makeup', shortDescription: 'Event, occasion and bridal makeup enquiries.', icon: '◇', image: images.makeup, items: [item('makeup-1','Party Makeup','makeup'),item('makeup-2','Occasion Makeup','makeup'),item('makeup-3','Bridal Makeup','makeup'),item('makeup-4','Engagement Makeup','makeup'),item('makeup-5','Makeup + Hair','makeup'),item('makeup-6','Bridal Enquiry','makeup')] },
  hairMen: { name: 'Men', shortDescription: 'Hair, beard, colour and grooming services.', icon: '—', image: images.hairMen, items: [item('men-1','Hair Cut + Head Wash + Blow Dry + Beard/Shave','hairMen','₹999'),item('men-2',"Hair Colour — L'Oréal",'hairMen'),item('men-3','Clean-Up','hairMen'),item('men-4','Fruit Facial + Bleach','hairMen'),item('men-5','O3 Facial + Bleach','hairMen')] },
}

export const servicesPreviewCards = [
  { key: 'hairWomen' as const, name: 'Hair', shortDescription: 'Cuts, colour and styling.', icon: '✂', image: images.hairWomen, href: '/services?cat=hairWomen' },
  { key: 'beauty' as const, name: 'Beauty & Skin', shortDescription: 'Facials, waxing and care.', icon: '○', image: images.beauty, href: '/services?cat=beauty' },
  { key: 'nails' as const, name: 'Nails', shortDescription: 'Manicure and pedicure.', icon: '□', image: images.nails, href: '/services?cat=nails' },
  { key: 'makeup' as const, name: 'Makeup', shortDescription: 'Party, event and bridal.', icon: '◇', image: images.makeup, href: '/services?cat=makeup' },
] as const
