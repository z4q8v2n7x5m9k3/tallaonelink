'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const categories = [
  { title: 'Diamond Jewellery', label: 'Modern Brilliance', image: '/talla/kriyon/fine-092.webp', href: 'https://tallajewellers.com/shop/?filter_jewellery-type=diamond-jewellery' },
  { title: 'Gold Essentials', label: 'New In Gold', image: '/talla/kriyon/fine-085.webp', href: 'https://tallajewellers.com/shop/?filter_metal-type=gold' },
  { title: 'Bridal Heirlooms', label: 'The Wedding Edit', image: '/talla/kriyon/fine-076.webp', href: 'https://tallajewellers.com/bridal-collections/' },
  { title: 'Polki & Heritage', label: 'Uncut Legacy', image: '/talla/kriyon/fine-110.webp', href: 'https://tallajewellers.com/polki-collections/' },
  { title: 'Daily Wear', label: 'Everyday Fine', image: '/talla/kriyon/fine-103.webp', href: 'https://tallajewellers.com/shop/?filter_occasion=everyday' },
  { title: 'ZAVI Silver', label: '925 Silver', image: '/talla/kriyon/fine-107.webp', href: 'https://tallajewellers.com/collections/zavi-silver-range/' },
]

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-[#111011] px-3 pb-12 pt-[max(.75rem,env(safe-area-inset-top))] text-white [font-family:var(--font-manrope)]">
      <div className="mx-auto max-w-md">
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,.3)]">
          <Image src="/talla/kriyon/fine-081.webp" alt="" fill priority className="object-cover object-[65%_36%] opacity-35" sizes="448px" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(52,4,31,.98)_0%,rgba(95,13,60,.84)_55%,rgba(35,5,23,.35)_100%)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} aria-label="Back home" className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/15"><ArrowLeft className="h-5 w-5" /></Link>
              <span className="relative h-12 w-12 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C]"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.9] object-cover" sizes="48px" /></span>
            </div>
            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[.28em] text-[#EACD8C]">Fresh from Talla</p>
            <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight">New Arrivals</h1>
            <p className="mt-2 max-w-[280px] text-[12px] font-medium leading-relaxed text-white/78">Explore the newest jewellery edits across bridal, gold, diamonds and silver.</p>
          </div>
        </header>

        <section className="py-6" aria-labelledby="categories-title">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <h2 id="categories-title" className="text-[20px] font-bold tracking-tight">Curated Categories</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-[#5F0D3C] via-[#DDB66A]/60 to-transparent" />
            </div>
            <p className="mt-1 text-[12px] font-medium text-white/60">Signature craftsmanship for every celebration.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.a
                key={category.title}
                href={category.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .045, duration: .28 }}
                className={`group relative overflow-hidden rounded-[20px] border border-[#DDB66A]/30 bg-[#24131D] shadow-[0_14px_30px_rgba(0,0,0,.25)] active:scale-98 transition-all ${index === 0 || index === 5 ? 'col-span-2 aspect-[16/7.5]' : 'aspect-[1/1]'}`}
              >
                <Image src={category.image} alt={category.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes={index === 0 || index === 5 ? '448px' : '216px'} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02)_18%,rgba(24,4,15,.22)_48%,rgba(18,3,12,.94)_100%)]" />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm group-hover:scale-105 transition-transform"><ArrowUpRight className="h-4 w-4 text-[#F0D495]" /></span>
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-[7.5px] font-semibold uppercase tracking-[.22em] text-[#EACD8C]">{category.label}</p>
                  <h3 className="mt-0.5 text-[16px] font-bold leading-tight">{category.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>

          <a href="https://tallajewellers.com/shop/" target="_blank" rel="noopener noreferrer" className="mt-5 flex h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/60 bg-gradient-to-r from-[#5F0D3C] via-[#6F0F46] to-[#5F0D3C] text-[13.5px] font-bold text-white shadow-[0_10px_24px_rgba(95,13,60,.28)] active:scale-98 transition-all">
            <Sparkles className="h-4 w-4 text-[#EACD8C]" />Shop All New Arrivals
          </a>
        </section>
      </div>
    </main>
  )
}
