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
    <main className="talla-unified min-h-screen bg-[#111011] px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-poppins)]">
      <div className="mx-auto w-full max-w-md">
        {/* Clean editorial header */}
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-5 text-white shadow-[0_18px_38px_rgba(0,0,0,.28)]">
          <Image
            src="/talla/kriyon/fine-081.webp"
            alt=""
            fill
            priority
            className="object-cover object-[65%_36%] opacity-48"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(52,4,31,.98)_0%,rgba(95,13,60,.87)_52%,rgba(35,5,23,.25)_100%)]" />

          <div className="relative">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                aria-label="Back home"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <span className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#EACD8C]">Talla Jewellers</span>
              <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C] shadow-md">
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
            <div className="mt-12 max-w-[290px]">
              <span className="block text-[9px] font-bold uppercase tracking-[.28em] text-[#EACD8C]">The latest edit</span>
              <h1 className="mt-1 text-[31px] font-extrabold leading-tight tracking-[-.025em] text-white">
                New Arrivals
              </h1>
              <p className="mt-2 text-[11px] font-medium leading-5 text-white/78">
                Newly arrived pieces across bridal, gold, diamonds, polki and silver.
              </p>
            </div>
          </div>
        </header>

        <div ref={filterScrollRef} className="mt-3 flex gap-2 overflow-x-auto rounded-[20px] border border-white/10 bg-[#1A1719] p-2 pr-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map(({ key, label, image }) => { const isActive = activeCategory === key; return <button key={key} data-cat-pill={key} type="button" onClick={() => selectCategory(key)} className={`flex h-11 shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-4 text-[11.5px] font-extrabold transition active:scale-95 ${isActive ? 'border-[#DDB66A] bg-[#F8F4EC] text-[#610138]' : 'border-white/12 bg-white/[.06] text-white/85'}`}><span className="relative h-9 w-9 overflow-hidden rounded-full border border-white/35"><Image src={image} alt="" fill unoptimized className="object-cover" sizes="36px" /></span>{label}</button> })}
        </div>

        {/* Section Subtitle & Count */}
        <div className="mt-6 mb-3 flex items-center justify-between px-1 text-white">
          <h2 className="text-[18px] font-extrabold tracking-[-.02em]">
            Featured Masterpieces
          </h2>
          <span className="rounded-full border border-[#DDB66A]/35 bg-white/[.06] px-2.5 py-1 text-[10px] font-bold text-[#EACD8C]">
            {filteredItems.length} styles
          </span>
        </div>

        {/* Editorial collection-style grid */}
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
                className={`${activeCategory !== 'all' || index === 0 || index === filteredItems.length - 1 ? 'col-span-2' : ''} relative overflow-hidden rounded-[22px] border border-[#DDB66A]/38 bg-[#201019] shadow-[0_12px_28px_rgba(0,0,0,.22)]`}
              >
                <a
                  href={item.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title}`}
                  className={`group relative block w-full overflow-hidden bg-[#1E0E18] ${activeCategory !== 'all' || index === 0 || index === filteredItems.length - 1 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="220px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.03)_22%,rgba(20,3,13,.40)_62%,rgba(12,2,8,.96)_100%)]" />
                  <div className="absolute inset-x-3 bottom-3 text-white">
                    <span className="text-[8px] font-bold uppercase tracking-[.2em] text-[#EACD8C]">{item.categoryLabel}</span>
                    <h3 className={`${activeCategory !== 'all' || index === 0 || index === filteredItems.length - 1 ? 'text-[18px]' : 'text-[13px]'} mt-0.5 font-extrabold leading-tight tracking-[-.02em]`}>{item.title}</h3>
                  </div>
                </a>
                <a href={getWhatsappProductLink(item.title)} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-3 flex h-9 items-center gap-1.5 rounded-full border border-[#EACD8C]/70 bg-[#610138] px-3.5 text-[10.5px] font-extrabold text-white shadow-[0_9px_20px_rgba(0,0,0,.28)] transition hover:bg-[#75114A] active:scale-95"><WhatsAppLogo className="h-[15px] w-[15px]" color="#25D366" /><span>Enquire</span></a>
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
