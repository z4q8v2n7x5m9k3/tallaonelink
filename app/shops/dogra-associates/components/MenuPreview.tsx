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
    <section id="services" aria-labelledby="collection-edit-title" className="mx-auto w-full max-w-md bg-[#111011] py-8">
      <motion.header {...reveal} transition={{ duration: 0.45 }} className="mb-6 text-left">
        <div className="section-title-accent talla-title-accent mb-2 after:!max-w-[88px]">
          <h2 id="collection-edit-title" className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">The Collection Edit</h2>
        </div>
        <p className="whitespace-nowrap [font-family:var(--font-manrope)] text-sm font-medium tracking-tight text-slate-300/90 sm:text-base">Bridal • Polki • Temple • Daily wear.</p>
      </motion.header>

      <div className="space-y-3">
        <motion.a
          href={collections.bridal.href}
          {...externalLinkProps}
          onClick={playClickSound}
          {...reveal}
          transition={{ duration: 0.48 }}
          className="group relative block aspect-[2/1] overflow-hidden rounded-[20px] border border-white/35 bg-[#24131D] shadow-[0_18px_38px_rgba(0,0,0,.30)]"
        >
          <Image src={collections.bridal.image} alt="Imperial bridal jewellery by Talla Jewellers" fill unoptimized sizes="(max-width: 448px) 100vw, 448px" className="object-cover object-[58%_38%] transition-transform duration-700 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,4,7,.76)_0%,rgba(9,4,7,.24)_47%,transparent_75%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,4,7,.18)_64%,rgba(8,4,7,.92)_100%)]" />
          <span className="pointer-events-none absolute inset-[4px] rounded-[16px] border border-white/[0.07]" />
          <span className="absolute right-4 top-4 [font-family:var(--font-manrope)] text-[8px] font-semibold tracking-[0.24em] text-white/58">01</span>
          <div className="absolute bottom-0 left-0 p-5">
            <p className="[font-family:var(--font-manrope)] text-[8.5px] font-medium uppercase tracking-[0.31em] text-[#F0D495]">{collections.bridal.label}</p>
            <h3 className="mt-1.5 [font-family:var(--font-manrope)] text-[25px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,.55)]">{collections.bridal.name}</h3>
          </div>
        </motion.a>

        <div className="grid grid-cols-2 gap-3.5">
          {[collections.polki, collections.temple].map((collection, index) => (
            <motion.a
              key={collection.name}
              href={collection.href}
              {...externalLinkProps}
              onClick={playClickSound}
              {...reveal}
              transition={{ duration: 0.44, delay: index * 0.06 }}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[18px] border border-white/22 bg-[#24131D] shadow-[0_14px_28px_rgba(0,0,0,.26)]"
            >
              <Image src={collection.image} alt={`${collection.name} by Talla Jewellers`} fill unoptimized sizes="(max-width: 448px) 50vw, 216px" className={`object-cover transition-transform duration-700 group-hover:scale-[1.035] ${index === 0 ? 'object-[54%_center]' : 'object-[50%_33%]'}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(10,4,7,.20)_56%,rgba(7,3,5,.94)_100%)]" />
              <span className="pointer-events-none absolute inset-[3px] rounded-[14px] border border-white/[0.07]" />
              <span className="absolute right-3 top-3 [font-family:var(--font-manrope)] text-[7.5px] font-semibold tracking-[0.20em] text-white/60">0{index + 2}</span>
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <p className="[font-family:var(--font-manrope)] text-[7.5px] font-medium uppercase tracking-[0.27em] text-[#F0D495]">{collection.label}</p>
                <h3 className="mt-1.5 [font-family:var(--font-manrope)] text-[17px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,.62)]">{collection.name}</h3>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.a
          href={collections.daily.href}
          {...externalLinkProps}
          onClick={playClickSound}
          {...reveal}
          transition={{ duration: 0.46 }}
          className="group relative block aspect-[2/1] overflow-hidden rounded-[20px] border border-white/35 bg-[#24131D] shadow-[0_18px_38px_rgba(0,0,0,.30)]"
        >
          <Image src={collections.daily.image} alt="Contemporary daily wear fine jewellery" fill unoptimized sizes="(max-width: 448px) 100vw, 448px" className="object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,5,8,.74)_0%,rgba(11,5,8,.24)_45%,transparent_74%)]" />
          <div className="absolute inset-0 bg-[rgba(35,9,24,.16)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(7,3,5,.12)_66%,rgba(7,3,5,.78)_100%)]" />
          <span className="pointer-events-none absolute inset-[4px] rounded-[16px] border border-white/[0.07]" />
          <span className="absolute right-4 top-4 [font-family:var(--font-manrope)] text-[8px] font-semibold tracking-[0.24em] text-white/58">04</span>
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-5">
            <p className="[font-family:var(--font-manrope)] text-[8.5px] font-medium uppercase tracking-[0.31em] text-[#F0D495]">{collections.daily.label}</p>
            <h3 className="mt-1.5 [font-family:var(--font-manrope)] text-[25px] font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,.58)]">{collections.daily.name}</h3>
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
