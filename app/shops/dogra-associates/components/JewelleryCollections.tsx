'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { playClickSound } from '../../../lib/playClickSound'
import { setReturnSection } from '../../../lib/homeNavigation'

const JEWELLERY_CATEGORIES = [
  {
    name: 'Bridal Jewellery',
    tagline: 'Royal Heirloom Sets',
    image: '/talla/ruby-couture-editorial.jpg',
    href: '/services',
  },
  {
    name: 'Gold Jewellery',
    tagline: '100% BIS Hallmarked',
    image: '/talla/talla-couture-03.png',
    href: '/services',
  },
  {
    name: 'Diamond Jewellery',
    tagline: 'Certified Natural Solitaires',
    image: '/talla/talla-couture-01.png',
    href: '/services',
  },
  {
    name: 'Diamond Polki',
    tagline: 'Uncut Heritage Polki',
    image: '/talla/talla-couture-02.png',
    href: '/services',
  },
  {
    name: 'Temple Jewellery',
    tagline: 'Sacred Antique Craftsmanship',
    image: '/talla/talla-couture-07.png',
    href: '/services',
  },
  {
    name: 'ZAVI Silver',
    tagline: '925 Pure Sterling Silver',
    image: '/talla/talla-detail-01.png',
    href: '/services',
  },
]

export default function JewelleryCollections() {
  return (
    <section id="services" className="w-full max-w-md mx-auto pt-6 pb-4">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mb-5"
      >
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDB66A] mb-1">
          THE COLLECTIONS
        </span>
        <h2 className="font-serif text-[26px] sm:text-[30px] font-normal tracking-[-0.01em] text-white leading-tight">
          Explore Our Jewellery
        </h2>
        <p className="font-sans text-xs sm:text-[13px] text-white/65 mt-1 font-normal tracking-wide">
          Discover collections for every occasion.
        </p>
      </motion.div>

      {/* 6 Photography-led cards grid (2 columns) */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {JEWELLERY_CATEGORIES.map((cat, idx) => (
          <Link
            key={cat.name}
            href={cat.href}
            onClick={() => {
              playClickSound()
              setReturnSection('services')
            }}
            className="block group"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: idx * 0.05, duration: 0.35, ease: 'easeOut' }}
              className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-white/10 bg-[#1F161E] shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:border-[#DDB66A]/60"
            >
              {/* Product / Campaign Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 448px) 50vw, 220px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Luxury dark vignette overlay */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(23,17,22,0.96) 0%, rgba(23,17,22,0.72) 36%, rgba(23,17,22,0.20) 70%, rgba(23,17,22,0.05) 100%)',
                }}
              />

              {/* Subtle Brand Emblem watermark in card corner */}
              <div
                className="absolute -right-3 -top-3 w-16 h-16 pointer-events-none opacity-[0.12] z-[2]"
                style={{
                  backgroundImage: 'url(/talla/talla-emblem.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
                aria-hidden
              />

              {/* Card Label Content */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 z-10">
                <span className="block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#DDB66A] mb-0.5">
                  {cat.tagline}
                </span>
                <h3 className="font-serif text-[17px] sm:text-[18px] font-normal text-white leading-tight group-hover:text-[#DDB66A] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* View All Jewellery Collections Button */}
      <div className="pt-2 text-center">
        <Link
          href="/services"
          onClick={() => {
            playClickSound()
            setReturnSection('services')
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#DDB66A]/50 bg-[#251520] px-6 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#370820] active:scale-[0.98]"
        >
          <span>View All Master Collections</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#DDB66A]" />
        </Link>
      </div>
    </section>
  )
}
