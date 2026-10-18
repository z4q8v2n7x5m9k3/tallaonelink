'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import WhatsAppLogo from '@/components/WhatsAppLogo'
import { shopConfig } from '../shops/dogra-associates/config'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

type CategoryKey = 'all' | 'bridal' | 'diamond' | 'gold' | 'polki' | 'daily' | 'silver'

interface CategoryFilter {
  key: CategoryKey
  label: string
  image: string
}

const CATEGORIES: CategoryFilter[] = [
  { key: 'all', label: 'All', image: '/talla/kriyon/fine-081.webp' },
  { key: 'bridal', label: 'Bridal', image: '/talla/kriyon/fine-076.webp' },
  { key: 'diamond', label: 'Diamonds', image: '/talla/kriyon/fine-092.webp' },
  { key: 'gold', label: 'Gold', image: '/talla/kriyon/fine-085.webp' },
  { key: 'polki', label: 'Polki', image: '/talla/kriyon/fine-110.webp' },
  { key: 'daily', label: 'Daily', image: '/talla/kriyon/fine-103.webp' },
  { key: 'silver', label: 'Silver', image: '/talla/kriyon/fine-107.webp' },
]

interface ProductItem {
  id: string
  title: string
  category: CategoryKey
  categoryLabel: string
  subtitle: string
  image: string
  shopUrl: string
}

const NEW_ARRIVALS: ProductItem[] = [
  {
    id: 'bridal-couture',
    title: 'Imperial Bridal Haar',
    category: 'bridal',
    categoryLabel: 'Bridal',
    subtitle: 'Handcrafted Colombian emeralds & 22KT antique gold heirloom.',
    image: '/talla/kriyon/fine-076.webp',
    shopUrl: 'https://tallajewellers.com/bridal-collections/',
  },
  {
    id: 'solitaire-diamond',
    title: 'Brilliant Diamond Suite',
    category: 'diamond',
    categoryLabel: 'Diamonds',
    subtitle: 'IGI certified natural solitaire diamonds in 18KT rose gold.',
    image: '/talla/kriyon/fine-092.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_jewellery-type=diamond-jewellery',
  },
  {
    id: 'polki-jadau',
    title: 'Jadau Polki Choker',
    category: 'polki',
    categoryLabel: 'Polki',
    subtitle: 'Royal Syndicate uncut polki with natural South Sea pearls.',
    image: '/talla/kriyon/fine-110.webp',
    shopUrl: 'https://tallajewellers.com/polki-collections/',
  },
  {
    id: 'gold-temple',
    title: 'Nakshi Temple Kada',
    category: 'gold',
    categoryLabel: 'Gold',
    subtitle: 'Embossed divine motifs in certified 100% BIS 916 pure gold.',
    image: '/talla/kriyon/fine-085.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_metal-type=gold',
  },
  {
    id: 'daily-fine',
    title: 'Everyday Diamond Bands',
    category: 'daily',
    categoryLabel: 'Daily',
    subtitle: 'Featherlight stackable diamond rings for modern elegance.',
    image: '/talla/kriyon/fine-103.webp',
    shopUrl: 'https://tallajewellers.com/shop/?filter_occasion=everyday',
  },
  {
    id: 'zavi-silver',
    title: 'ZAVI Pure 925 Silver',
    category: 'silver',
    categoryLabel: 'Silver',
    subtitle: 'Contemporary sterling silver jewellery by Talla Jewellers.',
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

  const defaultWhatsapp = shopConfig.contact.clientPhoneE164 || '918716900000'

  const getWhatsappProductLink = (title: string) => {
    const message = `Hello Talla Jewellers, I would like to inquire about the new arrival: "${title}". Please share pricing and availability.`
    return getWhatsAppLink(defaultWhatsapp, message)
  }

  return (
    <main className="talla-unified min-h-screen bg-[#FAF8F5] px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-manrope)]">
      <div className="mx-auto w-full max-w-md">
        {/* Luxury Unified Header with Integrated Categories */}
        <header className="relative overflow-hidden rounded-[30px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4.5 text-white shadow-[0_20px_42px_rgba(95,13,60,.32)]">
          <Image
            src="/talla/kriyon/fine-081.webp"
            alt=""
            fill
            priority
            className="object-cover object-[65%_36%] opacity-35"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(52,4,31,.98)_0%,rgba(95,13,60,.86)_55%,rgba(35,5,23,.45)_100%)]" />

          <div className="relative">
            {/* Top Navigation Bar */}
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

            {/* Header Titles */}
            <div className="mt-5">
              <span className="block text-[9.5px] font-bold uppercase tracking-[.26em] text-[#EACD8C]">
                Haute Joaillerie Edits
              </span>
              <h1 className="mt-1 text-[30px] font-black leading-tight tracking-tight text-white">
                New Arrivals
              </h1>
              <p className="mt-1 text-[12px] font-medium leading-relaxed text-white/85">
                Explore our freshest handcrafted masterworks across gold, diamonds, polki & silver.
              </p>
            </div>

            {/* Integrated Category Filter Bar inside Navbar */}
            <div className="mt-4 pt-3.5 border-t border-white/15">
              <div
                ref={filterScrollRef}
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {CATEGORIES.map(({ key, label, image }) => {
                  const isActive = activeCategory === key
                  return (
                    <button
                      key={key}
                      data-cat-pill={key}
                      type="button"
                      onClick={() => selectCategory(key)}
                      className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[11.5px] font-black transition-all shadow-sm active:scale-95 ${
                        isActive
                          ? 'border-white bg-white text-[#5F0D3C] shadow-[0_4px_14px_rgba(0,0,0,.25)]'
                          : 'border-white/20 bg-black/25 text-white/90 hover:bg-black/35'
                      }`}
                    >
                      <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-sm">
                        <Image
                          src={image}
                          alt={label}
                          fill
                          className="object-cover"
                          sizes="20px"
                        />
                      </span>
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Section Subtitle & Count */}
        <div className="mt-4 mb-3 flex items-center justify-between px-1">
          <h2 className="text-[17px] font-black tracking-tight text-[#1F0715]">
            Featured Masterpieces
          </h2>
          <span className="rounded-full border border-[#DDB66A]/45 bg-white px-2.5 py-0.5 text-[11px] font-black text-[#5F0D3C] shadow-sm">
            {filteredItems.length} styles
          </span>
        </div>

        {/* 2-Column Luxury Grid (No 22KT Badges, No Arrows, Clean & Focused) */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03, duration: 0.25 }}
                className="flex flex-col justify-between overflow-hidden rounded-[22px] border border-[#DDB66A]/40 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFDF9_60%,#FAF5EB_100%)] p-2.5 shadow-[0_10px_24px_rgba(50,16,31,.07)]"
              >
                {/* Product Image Showcase */}
                <a
                  href={item.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[1/1] w-full overflow-hidden rounded-[18px] bg-[#1E0E18]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="220px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </a>

                {/* Product Info & Action */}
                <div className="flex flex-1 flex-col justify-between pt-2.5 px-0.5">
                  <div>
                    <h3 className="text-[13.5px] font-black leading-tight text-[#1F0715] line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium leading-[1.35] text-[#6E5864] line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Clean Inquire Now Button */}
                  <a
                    href={getWhatsappProductLink(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#5F0D3C] to-[#75114A] text-[11.5px] font-black text-white shadow-[0_4px_12px_rgba(95,13,60,.20)] active:scale-95 transition-all hover:brightness-105"
                  >
                    <WhatsAppLogo className="h-3.5 w-3.5" color="#25D366" />
                    <span>Inquire Now</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Premium Bottom Full Shop CTA with Talla Emblem Branding */}
        <section className="mt-7">
          <a
            href="https://tallajewellers.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full border border-[#DDB66A]/60 bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] text-[13.5px] font-black text-white shadow-[0_12px_28px_rgba(95,13,60,.28)] active:scale-98 transition-all hover:brightness-105"
          >
            <span className="relative h-6 w-6 overflow-hidden rounded-full border border-[#DDB66A]/80 shadow-sm shrink-0">
              <Image
                src="/talla/elegant-gold-t-emblem.png"
                alt="Talla Jewellers"
                fill
                className="scale-[1.8] object-cover"
                sizes="24px"
              />
            </span>
            <span>Explore Official Talla Website</span>
            <ArrowUpRight className="h-4 w-4 text-[#EACD8C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </section>
      </div>
    </main>
  )
}
