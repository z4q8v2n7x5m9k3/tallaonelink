export interface PricingPackage { id: string; title: string; category: string; price: string; timeline: string; description: string; features: string[]; image: string; popular?: boolean }

export const pricingPackages: PricingPackage[] = [
  { id: 'hair-spa', title: 'Hair Spa', category: 'Hair', price: '₹1,399', timeline: 'Matrix Hair Spa', description: 'A professional hair-spa ritual for care and maintenance.', features: [], image: '/femina/veloura-hair-editorial.png' },
  { id: 'hydra-facial', title: 'Hydra Facial', category: 'Skin', price: '₹1,599', timeline: 'Basic Hydra Facial', description: 'A published basic Hydra Facial service.', features: [], image: '/femina/veloura-skin-editorial.png' },
  { id: 'root-touch-up', title: 'Root Touch-Up', category: 'Hair', price: '₹1,799', timeline: 'Matrix Colour', description: 'Root colour maintenance using Matrix colour.', features: [], image: '/femina/veloura-hair-editorial.png' },
  { id: 'global-colour', title: 'Global Hair Colour', category: 'Hair', price: '₹3,299', timeline: 'Matrix', description: 'Published global hair-colour service.', features: [], image: '/femina/veloura-hair-editorial.png' },
  { id: 'keratin', title: 'Keratin Treatment', category: 'Hair Treatment', price: '₹3,499', timeline: 'Matrix', description: 'Published Matrix keratin treatment.', features: [], image: '/femina/veloura-hair-editorial.png' },
  { id: 'smoothening', title: 'Smoothening / Rebonding', category: 'Hair Treatment', price: '₹6,799', timeline: 'Matrix', description: 'Published smoothening or rebonding service.', features: [], image: '/femina/veloura-hair-editorial.png' },
]
