'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { playClickSound } from '../../../lib/playClickSound'
import { pricingPackages } from '../pricing'

export default function UrgencyCTA() {
  const packages = pricingPackages.slice(0, 4)
  const rail = useRef<HTMLDivElement>(null)
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * 292, behavior: 'smooth' })
  return (
    <motion.section id="packages" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.35 }} className="w-full max-w-md mx-auto py-6 scroll-mt-5">
      <div className="mb-5"><div className="section-title-accent mb-2"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-left">Popular Salon Packages</h2></div><p className="text-sm sm:text-base text-white/65 text-left">Curated hair, beauty and makeup appointments.</p></div>
      <div ref={rail} className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {packages.map((pkg, index) => (
          <motion.article key={pkg.id} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04, duration: 0.28 }} className="relative aspect-square w-[70%] shrink-0 snap-center overflow-hidden rounded-[25px] border border-[#d8be80]/55 bg-[#171411] shadow-[0_16px_34px_rgba(0,0,0,.28)]">
            <div className="absolute inset-0 overflow-hidden">
              <Image src={pkg.image} alt={pkg.title} fill sizes="448px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,10,8,.98)_0%,rgba(15,12,10,.75)_43%,rgba(15,12,10,.12)_78%)]" />
            </div>
            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">{pkg.category}</span>
            <span className="absolute right-4 top-4 text-3xl font-black text-white/45">0{index + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white"><h3 className="text-[19px] font-black leading-tight">{pkg.title}</h3><p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-white/78"><CheckCircle2 className="h-3.5 w-3.5 text-[#F4D980]" />{pkg.timeline}</p><span className="mt-3 inline-flex rounded-full border border-[#ead28f]/45 bg-[#80642a]/85 px-3 py-1.5 text-sm font-black backdrop-blur-md">{pkg.price}</span></div>
          </motion.article>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2"><button type="button" onClick={() => move(-1)} aria-label="Previous package" className="grid h-10 w-10 place-items-center rounded-full border border-[#d8be80]/50 bg-[#24201a] text-[#f0d494] shadow-sm"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => move(1)} aria-label="Next package" className="grid h-10 w-10 place-items-center rounded-full border border-[#d8be80]/50 bg-[#24201a] text-[#f0d494] shadow-sm"><ArrowRight className="h-4 w-4" /></button><Link href="/packages" onClick={playClickSound} className="ml-auto inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#ead28f]/55 bg-[linear-gradient(135deg,#604b22,#92753a)] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,0,0,.22)]">View Price Menu <ArrowRight className="h-4 w-4" /></Link></div>
    </motion.section>
  )
}
