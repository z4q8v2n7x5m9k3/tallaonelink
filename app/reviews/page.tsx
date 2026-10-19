'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReviewsPanel from '../components/ReviewsPanel'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

export default function ReviewsPage() {
  return <main className="talla-unified min-h-screen bg-[#111011] px-4 pb-12 pt-[max(1rem,env(safe-area-inset-top))]">
    <div className="mx-auto max-w-md">
      <header className="relative mb-5 overflow-hidden rounded-[28px] border border-[#DDB66A]/25 bg-[#610138] p-5 text-white">
        <Image src="/talla/talla-showroom.webp" alt="" fill priority className="object-cover opacity-20" sizes="448px" /><div className="absolute inset-0 bg-gradient-to-r from-[#410725]/95 to-[#610138]/55" />
        <div className="relative"><div className="flex items-center justify-between"><Link href="/" onClick={()=>prepareReturnToHeroCard()} aria-label="Back home" className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-black/10"><ArrowLeft className="h-[18px] w-[18px]" /></Link><span className="relative h-11 w-11 overflow-hidden rounded-full border border-white/25"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.72] object-cover" sizes="44px" /></span></div>
        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[.25em] text-[#E6C788]">Talla Jewellers · Customer Stories</p><h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">Customer Reviews</h1><p className="mt-3 max-w-[290px] text-[12px] leading-5 text-white/70">Celebrations, heirlooms and the moments you share with us.</p></div>
      </header>
      <ReviewsPanel full />
      <Link href="/nearest-branch" className="mt-6 flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 text-[12px] font-medium text-white/75">Plan your visit to Talla</Link>
    </div>
  </main>
}
