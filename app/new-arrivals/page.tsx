'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Crown, Gem, Layers, Sparkles, Star } from 'lucide-react'
import WhatsAppLogo from '@/components/WhatsAppLogo'
import { shopConfig } from '../shops/dogra-associates/config'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

type CategoryKey = 'all' | 'bridal' | 'diamond' | 'gold' | 'polki' | 'daily' | 'silver'

interface CategoryFilter {
  key: CategoryKey
  label: string
  icon: typeof Sparkles
}

const CATEGORIES: CategoryFilter[] = [
  { key: 'all', label: 'All New', icon: Layers },
  { key: 'bridal', label: 'Bridal Heirlooms', icon: Crown },
  { key: 'diamond', label: 'Diamonds', icon: Sparkles },
  { key: 'gold', label: 'Gold Essentials', icon: Gem },
  { key: 'polki', label: 'Heritage Polki', icon: Star },
  { key: 'daily', label: 'Daily Wear', icon: Sparkles },
  { key: 'silver', label: 'ZAVI Silver', icon: Gem },
]

interface ProductItem {
  id: string
  title: string
  category: CategoryKey
  categoryLabel: string
  tagline: string
  description: string
  badge: string
  image: string
  shopUrl: string
}

const NEW_ARRIVALS: ProductItem[] = [
  {
    id: 'bridal-couture',
    title: 'The Imperial Bridal Choker & Haar',
    category: 'bridal',
    categoryLabel: 'Bridal Heirlooms',
    tagline: 'Imperial Royal Collection',
    description: 'Intricately handcrafted with certified Colombian emerald drops and 22KT antique finish gold for the modern regal bride.',
    badge: '22KT Heritage Gold',
    image: '/talla/kriyon/fine-076.webp',
    shopUrl: 'https://tallajewellers.com/bridal-collections/',
  },
  {
    id: 'solitaire-diamond',
    title: 'Contemporary Diamond Suite',
    category: 'diamond',
    categoryLabel: 'Diamond Jewellery',
    tagline: 'Modern Brilliance',
    description: 'Precision-cut natural diamonds set in 18KT rose and white gold, crafted to dazzle from dawn to midnight.',
    badge: 'IGI Certified Natural',
    image: '/talla/kriyon/fine-092.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_jewellery-type=diamond-jewellery',
  },
  {
    id: 'polki-jadau',
    title: 'Uncut Jadau Polki Necklace',
    category: 'polki',
    categoryLabel: 'Heritage Polki',
    tagline: 'Uncut Royal Legacy',
    description: 'Centuries-old royal craftsmanship reimagined with uncut Syndicate polki stones and South Sea pearls.',
    badge: 'Handcrafted Heritage',
    image: '/talla/kriyon/fine-110.webp',
    shopUrl: 'https://tallajewellers.com/polki-collections/',
  },
  {
    id: 'gold-temple',
    title: 'Nakshi & Temple Gold Kadas',
    category: 'gold',
    categoryLabel: 'Gold Essentials',
    tagline: 'New In Pure Gold',
    description: 'Heavy architectural filigree and embossed divinity motifs in hallmarked 916 yellow gold.',
    badge: 'BIS 916 Hallmarked',
    image: '/talla/kriyon/fine-085.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_metal-type=gold',
  },
  {
    id: 'daily-fine',
    title: 'Everyday Minimalist Diamond Rings',
    category: 'daily',
    categoryLabel: 'Daily Wear',
    tagline: 'Everyday Fine Joaillerie',
    description: 'Feather-light stackable bands and pavé pendants styled for daily wear without compromising grandeur.',
    badge: 'Modern Luxury',
    image: '/talla/kriyon/fine-103.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_occasion=everyday',
  },
  {
    id: 'zavi-silver',
    title: 'ZAVI 925 Sterling Silver Edits',
    category: 'silver',
    categoryLabel: 'ZAVI Silver',
    tagline: 'Pure 925 Silver',
    description: 'Modern silver elegance curated by Talla Jewellers for casual festive celebrations and contemporary gifting.',
    badge: '925 Sterling Hallmarked',
    image: '/talla/kriyon/fine-107.webp',
    shopUrl: 'https://tallajewellers.com/collections/zavi-silver-range/',
  },
]

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')
  const filterScrollRef = useRef<HTMLDivElement>(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return NEW_ARRIVALS
    return NEW_ARRIVALS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const selectCategory = (cat: CategoryKey) => {
    setActiveCategory(cat)
    window.setTimeout(() => {
      filterScrollRef.current
        ?.querySelector<HTMLElement>(`[data-cat-pill="${cat}"]`)
        ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }, 50)
  }

  const defaultWhatsapp = shopConfig.contact.clientPhoneE164 || '919000000000'

  const getWhatsappProductLink = (title: string) => {
    const message = `Hello Talla Jewellers, I am interested in knowing more about the new arrival: "${title}". Please share details and pricing.`
    return getWhatsAppLink(defaultWhatsapp, message)
  }

  return (
    <main className="talla-unified min-h-screen bg-[#FAF8F5] px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-manrope)]">
      <div className="mx-auto w-full max-w-md">
        {/* Luxury Royal Header */}
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_40px_rgba(95,13,60,.28)]">
          <Image
            src="/talla/kriyon/fine-081.webp"
            alt=""
            fill
            priority
            className="object-cover object-[65%_36%] opacity-35"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(52,4,31,.98)_0%,rgba(95,13,60,.84)_55%,rgba(35,5,23,.35)_100%)]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                aria-label="Back home"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="text-center">
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#EACD8C]">
                  Talla Jewellers
                </span>
                <span className="block text-[11px] font-semibold text-white/80">Est. 1960</span>
              </div>
              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C] shadow-md">
                <Image
                  src="/talla/elegant-gold-t-emblem.png"
                  alt="Talla Jewellers"
                  fill
                  className="scale-[1.8] object-cover"
                  sizes="44px"
                />
              </span>
            </div>

            <div className="mt-5">
              <p className="text-[9.5px] font-bold uppercase tracking-[.26em] text-[#EACD8C]">
                Haute Joaillerie Edits
              </p>
              <h1 className="mt-1 text-[28px] font-black leading-tight tracking-tight text-white">
                New Arrivals
              </h1>
              <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-white/80">
                Explore our freshest heirlooms across bridal couture, natural diamonds, certified gold and fine silver.
              </p>
            </div>

            {/* Quick Links Nav */}
            <nav className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-black/15 p-1.5 backdrop-blur-sm">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                className="flex h-9 items-center justify-center rounded-xl text-[11px] font-bold text-white/90 hover:bg-white/10 transition-colors"
              >
                Return to Card
              </Link>
              <a
                href={getWhatsAppLink(defaultWhatsapp, 'Hello Talla Jewellers, I would like to see your latest new arrivals catalogue.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-white text-[11px] font-black text-[#5F0D3C] shadow-sm transition-transform active:scale-95"
              >
                <WhatsAppLogo className="h-4 w-4" color="#25D366" />
                WhatsApp Catalogue
              </a>
            </nav>
          </div>
        </header>

        {/* Poshak Ki Noor Style Horizontal Scroll Category Filter Bar */}
        <section className="mt-4" aria-label="Category Filters">
          <div
            ref={filterScrollRef}
            className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORIES.map(({ key, label, icon: Icon }) => {
              const isActive = activeCategory === key
              return (
                <button
                  key={key}
                  data-cat-pill={key}
                  type="button"
                  onClick={() => selectCategory(key)}
                  className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[12px] font-bold transition-all shadow-sm active:scale-95 ${
                    isActive
                      ? 'border-[#5F0D3C] bg-[#5F0D3C] text-white shadow-[0_4px_12px_rgba(95,13,60,.25)]'
                      : 'border-[#DDB66A]/35 bg-white text-[#4A3440] hover:border-[#DDB66A] hover:bg-[#FFFDF9]'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      isActive ? 'bg-white/15 text-[#EACD8C]' : 'bg-[#FAF2E4] text-[#80652C]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Category Heading & Count */}
        <div className="mt-4 mb-3.5 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9A7A35]">
              {activeCategory === 'all' ? 'All Handcrafted Edits' : `${activeCategory} Collection`}
            </p>
            <h2 className="mt-0.5 text-[18px] font-extrabold tracking-tight text-[#1F0715]">
              Featured Masterpieces
            </h2>
          </div>
          <span className="rounded-full border border-[#DDB66A]/40 bg-white px-2.5 py-1 text-[11px] font-extrabold text-[#5F0D3C] shadow-sm">
            {filteredItems.length} styles
          </span>
        </div>

        {/* Wide Luxury Product Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: index * 0.04, duration: 0.28 }}
                className="overflow-hidden rounded-[26px] border border-[#E8DEC8] bg-white p-2.5 shadow-[0_12px_28px_rgba(50,16,31,.07)]"
              >
                {/* Wide Product Image Showcase */}
                <div className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-[#24131D]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="448px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                  {/* Top Badge */}
                  <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-[#EACD8C] backdrop-blur-md">
                    {item.badge}
                  </span>

                  {/* Top Right Direct Link Pill */}
                  <a
                    href={item.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title} on website`}
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-transform group-hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#F3D890]" />
                  </a>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <span className="text-[8px] font-bold uppercase tracking-[.22em] text-[#EACD8C]">
                      {item.tagline}
                    </span>
                    <h3 className="mt-0.5 text-[17px] font-black leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Details & Action Buttons */}
                <div className="px-2 pt-3 pb-1">
                  <p className="text-[12px] font-medium leading-relaxed text-[#5A4550]">
                    {item.description}
                  </p>

                  <div className="mt-3.5 grid grid-cols-2 gap-2">
                    <a
                      href={item.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#5F0D3C] via-[#6F0F46] to-[#5F0D3C] text-[12px] font-extrabold text-white shadow-[0_4px_14px_rgba(95,13,60,.22)] active:scale-95 transition-all"
                    >
                      <span>Explore Piece</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#EACD8C]" />
                    </a>

                    <a
                      href={getWhatsappProductLink(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-2xl border border-[#9CDAB4] bg-[#F4FBF6] text-[12px] font-extrabold text-[#176C40] shadow-sm active:scale-95 transition-all"
                    >
                      <WhatsAppLogo className="h-4 w-4" color="#25D366" />
                      <span>WhatsApp Enquire</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Premium Bottom Full Shop CTA */}
        <section className="mt-8">
          <a
            href="https://tallajewellers.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/60 bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] text-[13.5px] font-black text-white shadow-[0_12px_28px_rgba(95,13,60,.28)] active:scale-98 transition-all hover:brightness-105"
          >
            <Sparkles className="h-4 w-4 text-[#EACD8C] transition-transform group-hover:rotate-12" />
            <span>Shop All New Arrivals on Website</span>
            <ArrowUpRight className="h-4 w-4 text-[#EACD8C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </section>
      </div>
    </main>
  )
}
