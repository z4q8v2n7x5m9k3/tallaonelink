'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, PenLine } from 'lucide-react'
import GoogleGIcon from '../components/GoogleGIcon'
import ReviewsPanel from '../components/ReviewsPanel'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

export default function ReviewsPage() {
  const writeReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJyQ392bqEHjkRPv7z1rhWPjA'

  return <main className="talla-unified min-h-screen bg-[#111011] px-4 pb-12 pt-[max(1rem,env(safe-area-inset-top))]">
    <div className="mx-auto max-w-md">
      <header className="relative mb-5 overflow-hidden rounded-[28px] border border-[#DDB66A]/25 bg-[#610138] p-5 text-white">
        <Image src="/talla/talla-showroom.webp" alt="" fill priority className="object-cover opacity-20" sizes="448px" /><div className="absolute inset-0 bg-gradient-to-r from-[#410725]/95 to-[#610138]/55" />
        <div className="relative"><div className="flex items-center justify-between"><Link href="/" onClick={()=>prepareReturnToHeroCard()} aria-label="Back home" className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-black/10"><ArrowLeft className="h-[18px] w-[18px]" /></Link><span className="relative h-11 w-11 overflow-hidden rounded-full border border-white/25"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.72] object-cover" sizes="44px" /></span></div>
        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[.25em] text-[#E6C788]">Talla Jewellers · Customer Stories</p><h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">Customer Reviews</h1><p className="mt-3 max-w-[290px] text-[12px] leading-5 text-white/70">Celebrations, heirlooms and the moments you share with us.</p>
        <a href={writeReviewUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8CA85]/55 bg-white px-4 text-[11px] font-extrabold text-[#4A1730] shadow-[0_10px_24px_rgba(0,0,0,.18)] transition active:scale-[.98]"><span className="grid h-7 w-7 place-items-center rounded-full border border-slate-100 bg-white shadow-sm"><GoogleGIcon className="h-4 w-4" /></span>Write a Review<PenLine className="h-3.5 w-3.5 text-[#8A5A22]" /></a></div>
      </header>
      <ReviewsPanel full />
      <Link href="/nearest-branch" className="mt-6 flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 text-[12px] font-medium text-white/75">Plan your visit to Talla</Link>
    </div>
  </main>
}
