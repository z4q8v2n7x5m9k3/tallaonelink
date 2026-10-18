'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, IndianRupee, Scissors } from 'lucide-react'

import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'
import { pricingPackages } from '../shops/dogra-associates/pricing'

function packageMessage(title: string) {
  return `Hi Veloura, I would like to enquire about ${title}. Please share appointment availability.`
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function PackagesPage() {
  const categories = ['All', ...Array.from(new Set(pricingPackages.map((item) => item.category)))]
  const [activeCategory, setActiveCategory] = useState('All')
  const visiblePackages = useMemo(() => activeCategory === 'All' ? pricingPackages : pricingPackages.filter((item) => item.category === activeCategory), [activeCategory])

  return (
    <main
      className="veloura-page min-h-screen px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{ background: '#F4F1EB' }}
    >
      <div className="mx-auto w-full max-w-md">
        <div className="-mx-3 px-3 pt-2 pb-1">
        <header data-marble-hero className="overflow-hidden rounded-[28px] border border-white/20 p-3.5 text-white shadow-[0_16px_34px_rgba(79,56,18,.24)]" style={{ backgroundImage: "linear-gradient(90deg,rgba(48,34,13,.98) 0%,rgba(103,77,28,.94) 54%,rgba(139,106,42,.68) 100%),url('/femina/veloura-hair-editorial.png')", backgroundSize: 'cover', backgroundPosition: 'center right' }}>
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={() => prepareReturnToHeroCard()}
              className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#181818] ring-1 ring-black/10 shadow-sm transition-transform active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-[#181818]" />
            </Link>
            <h1 className="absolute left-0 right-0 px-11 text-center text-[1.4rem] font-black leading-tight tracking-tight text-white">
              Price Menu
            </h1>
            <span className="z-10 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ring-1 ring-white/20">Prices</span>
          </div>
          <p className="mt-2.5 px-1 text-xs font-medium leading-5 text-white/82">
            Explore current salon prices by category.
          </p>
          <nav className="mt-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/55 bg-white/95 p-1.5 shadow-[0_10px_22px_rgba(0,0,0,.15)]"><Link href="/services" className="flex h-9 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold text-[#29231a]"><Scissors className="h-3.5 w-3.5"/>Services</Link><Link data-active="true" href="/packages" className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,#665020,#9a7a35)] text-[11px] font-black text-white"><IndianRupee className="h-3.5 w-3.5"/>Prices</Link><Link href="/book-consultation" className="flex h-9 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold text-[#29231a]"><CalendarDays className="h-3.5 w-3.5"/>Book</Link></nav>
          <div className="mt-4"><p className="mb-2 text-[10px] font-black uppercase tracking-[.15em] text-white/70">Categories</p><div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`h-10 shrink-0 rounded-full border px-4 text-xs font-extrabold transition ${activeCategory === category ? 'border-[#E9D18A] bg-[#3F2F12] text-white shadow-[0_7px_16px_rgba(30,20,4,.28)]' : 'border-white/30 bg-white/10 text-white'}`}>{category}</button>)}
          </div></div>
        </header></div>

        <div className="grid gap-3">
          {visiblePackages.map((pkg, index) => {
            return (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.28 }}
              className="relative overflow-hidden rounded-[28px] border border-[#E2D2B4] bg-white p-2 shadow-[0_18px_38px_rgba(79,56,18,.13)]"
            >
              <Image
                src={pkg.image}
                alt=""
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover object-center opacity-0"
                aria-hidden
              />
              <div className="relative h-[158px] overflow-hidden rounded-[22px]"><Image src={pkg.image} alt={pkg.title} fill sizes="448px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" /><span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white backdrop-blur-md">{pkg.category}</span><span className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-[#604B22]/90 px-3 py-1.5 text-sm font-black text-white backdrop-blur-md">{pkg.price}</span></div>
              <div className="pointer-events-none absolute inset-0" aria-hidden />
              <div className="absolute right-[-2.4rem] top-[-2.4rem] h-28 w-28 rounded-full bg-[#9B8468]/[0.10] blur-2xl pointer-events-none" />
              <div className="absolute bottom-[-2.8rem] left-[-2.8rem] h-28 w-28 rounded-full bg-[#1D1B19]/[0.06] blur-2xl pointer-events-none" />
              <div className="relative z-10 px-2 pb-2 pt-3.5">
                <div className="mb-3 flex items-start justify-between gap-2.5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="min-w-0">
                      <h2 className="text-[17px] font-black leading-tight text-slate-950">
                        {pkg.title}
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-[12.5px] font-semibold leading-5 text-slate-700">
                    <span className="mt-0.5 inline-grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#8C735E] text-[10px] font-black leading-none text-[#8C735E]">✓</span>
                    <span>{pkg.timeline}</span>
                </p>
                <p className="mt-2.5 text-[13px] font-medium leading-5 text-slate-600">{pkg.description}</p>
                <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/book-consultation?service=${encodeURIComponent(pkg.title)}`}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,#604B22,#9A8140)] px-3 text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(96,75,34,.22)] transition-transform active:scale-[0.98]"
                  >
                    <CalendarDays className="h-4 w-4" /> Book Now
                  </Link>
                  <Link
                      href={getWhatsAppLink(shopConfig.contact.clientPhoneE164, packageMessage(pkg.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border px-3 text-[12px] font-extrabold shadow-[0_8px_18px_rgba(19,123,112,0.11)] transition-transform active:scale-[0.98]"
                      style={{
                        color: '#5D4A3B',
                        borderColor: 'rgba(93,74,59,0.18)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,.96) 0%, rgba(233,226,216,.88) 100%)',
                      }}
                      aria-label={`Enquire about ${pkg.title}`}
                    >
                      <WhatsAppMark />
                      Enquire
                    </Link>
                </div>
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
