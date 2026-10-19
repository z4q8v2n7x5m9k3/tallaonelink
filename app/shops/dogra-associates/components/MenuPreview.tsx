'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { playClickSound } from '../../../lib/playClickSound'

const collections = {
  bridal: {
    name: 'The Bridal Edit',
    label: 'Imperial Bridal Jewels',
    image: '/talla/talla-couture-03.png',
    href: 'https://tallajewellers.com/bridal-collections/',
  },
  polki: {
    name: 'Diamond Polki',
    label: 'Uncut Heritage',
    image: '/talla/collection-edit/fine-polki.png',
    href: 'https://tallajewellers.com/polki-collections/',
  },
  temple: {
    name: 'Temple Jewellery',
    label: 'Sacred Gold',
    image: '/talla/collection-edit/temple-jewellery.png',
    href: 'https://tallajewellers.com/temple-collections/',
  },
  daily: {
    name: 'Daily Wear',
    label: 'Everyday Fine Jewellery',
    image: '/talla/collection-edit/daily-wear-fine.png',
    href: 'https://tallajewellers.com/shop/?filter_occasion=everyday',
  },
}

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-35px' },
}

export default function MenuPreview() {
  return (
    <section id="services" aria-labelledby="collection-edit-title" className="mx-auto w-full max-w-md bg-[#111011] py-6">
      <motion.header {...reveal} transition={{ duration: 0.45 }} className="mb-6 text-left">
        <div className="section-title-accent talla-title-accent mb-2 after:!max-w-[88px]">
          <h2 id="collection-edit-title" className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">The Collection Edit</h2>
        </div>
        <p className="whitespace-nowrap [font-family:var(--font-manrope)] text-sm font-medium tracking-tight text-slate-300/90 sm:text-base">Bridal • Polki • Temple • Daily wear.</p>
      </motion.header>

      <div className="space-y-3">
        {/* 01: The Bridal Edit */}
        <motion.a
          href={collections.bridal.href}
          {...externalLinkProps}
          onClick={playClickSound}
          {...reveal}
          transition={{ duration: 0.48 }}
          className="group relative block aspect-[2.35/1] overflow-hidden rounded-[20px] border border-[#DDB66A]/35 bg-[#24131D] shadow-[0_16px_34px_rgba(0,0,0,.30)]"
        >
          <Image src={collections.bridal.image} alt="Imperial bridal jewellery by Talla Jewellers" fill unoptimized sizes="(max-width: 448px) 100vw, 448px" className="object-cover object-[58%_38%] transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,4,7,.82)_0%,rgba(9,4,7,.32)_48%,transparent_75%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,4,7,.88)_100%)]" />
          <span className="pointer-events-none absolute inset-[3px] rounded-[17px] border border-white/[0.08]" />
          <span className="absolute right-3.5 top-3.5 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 [font-family:var(--font-manrope)] text-[8px] font-bold tracking-[0.18em] text-[#EACD8C] backdrop-blur-sm">01</span>
          <div className="absolute bottom-0 left-0 p-4">
            <p className="[font-family:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[0.28em] text-[#F0D495]">{collections.bridal.label}</p>
            <h3 className="mt-1 [font-family:var(--font-manrope)] text-[22px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,.6)]">{collections.bridal.name}</h3>
          </div>
        </motion.a>

        {/* 02 & 03: Polki & Temple (Reduced height square aspect) */}
        <div className="grid grid-cols-2 gap-3">
          {[collections.polki, collections.temple].map((collection, index) => (
            <motion.a
              key={collection.name}
              href={collection.href}
              {...externalLinkProps}
              onClick={playClickSound}
              {...reveal}
              transition={{ duration: 0.44, delay: index * 0.06 }}
              className="group relative block aspect-[1/0.95] overflow-hidden rounded-[18px] border border-[#DDB66A]/30 bg-[#24131D] shadow-[0_12px_26px_rgba(0,0,0,.26)]"
            >
              <Image src={collection.image} alt={`${collection.name} by Talla Jewellers`} fill unoptimized sizes="(max-width: 448px) 50vw, 216px" className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${index === 0 ? 'object-[54%_center]' : 'object-[50%_33%]'}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,4,7,.35)_60%,rgba(7,3,5,.94)_100%)]" />
              <span className="pointer-events-none absolute inset-[3px] rounded-[15px] border border-white/[0.08]" />
              <span className="absolute right-2.5 top-2.5 rounded-full border border-white/20 bg-black/40 px-1.5 py-0.5 [font-family:var(--font-manrope)] text-[7.5px] font-bold tracking-[0.16em] text-[#EACD8C] backdrop-blur-sm">0{index + 2}</span>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="[font-family:var(--font-manrope)] text-[7px] font-semibold uppercase tracking-[0.24em] text-[#F0D495]">{collection.label}</p>
                <h3 className="mt-1 [font-family:var(--font-manrope)] text-[15.5px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,.65)]">{collection.name}</h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 04: Daily Wear (Reduced height) */}
        <motion.a
          href={collections.daily.href}
          {...externalLinkProps}
          onClick={playClickSound}
          {...reveal}
          transition={{ duration: 0.46 }}
          className="group relative block aspect-[2.5/1] overflow-hidden rounded-[20px] border border-[#DDB66A]/35 bg-[#24131D] shadow-[0_16px_34px_rgba(0,0,0,.30)]"
        >
          <Image src={collections.daily.image} alt="Contemporary daily wear fine jewellery" fill unoptimized sizes="(max-width: 448px) 100vw, 448px" className="object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,5,8,.82)_0%,rgba(11,5,8,.30)_48%,transparent_74%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,3,5,.85)_100%)]" />
          <span className="pointer-events-none absolute inset-[3px] rounded-[17px] border border-white/[0.08]" />
          <span className="absolute right-3.5 top-3.5 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 [font-family:var(--font-manrope)] text-[8px] font-bold tracking-[0.18em] text-[#EACD8C] backdrop-blur-sm">04</span>
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-4">
            <p className="[font-family:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[0.28em] text-[#F0D495]">{collections.daily.label}</p>
            <h3 className="mt-1 [font-family:var(--font-manrope)] text-[22px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,.6)]">{collections.daily.name}</h3>
          </div>
        </motion.a>
      </div>

      <div className="mt-5">
        <a href="https://tallajewellers.com/shop/" {...externalLinkProps} onClick={playClickSound} className="group relative flex h-[54px] w-full items-center justify-center overflow-hidden rounded-full border border-[#DDB66A]/75 bg-[#610138] [font-family:var(--font-manrope)] text-[15px] font-semibold tracking-tight text-[#FFF9ED] shadow-[0_10px_24px_rgba(0,0,0,.22)] transition active:scale-[0.98]">
          <span className="relative mr-2 h-9 w-9 overflow-hidden rounded-full border border-[#E8C77F]/45 bg-[#650039]">
            <Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill unoptimized className="scale-[1.9] object-cover" sizes="36px" />
          </span>
          <span className="relative">Explore All Collections</span>
        </a>
      </div>
    </section>
  )
}
