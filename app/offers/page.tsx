'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'

export default function OffersPage() {
  const message = 'Hi Veloura, I would like to know about your current offers.'
  return <main className="veloura-page min-h-screen bg-[#F4F1EB] px-3 pb-10 pt-[max(.75rem,env(safe-area-inset-top))]"><div className="mx-auto w-full max-w-md">
    <header className="mb-4 overflow-hidden rounded-[28px] border border-white/30 p-4 text-white shadow-[0_18px_38px_rgba(143,35,85,.24)]" style={{ background: 'linear-gradient(135deg,#5A1636,#B32A64 58%,#E18AAE)' }}><div className="relative flex items-center justify-between"><Link href="/" onClick={prepareReturnToHeroCard} aria-label="Back" className="z-10 grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25"><ArrowLeft className="h-5 w-5" /></Link><h1 className="absolute inset-x-12 text-center text-xl font-black leading-11">Current offers</h1><Gift className="h-5 w-5" /></div><p className="mt-3 text-sm leading-6 text-white/85">Talk to the salon team for service availability and current branch-specific offers.</p></header>
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[28px] border border-[#DED9D2] bg-[#FCFBF8] p-5"><span className="inline-flex items-center gap-2 rounded-full bg-[#E9E2D8] px-3 py-1.5 text-[11px] font-black uppercase tracking-[.12em] text-[#1D1B19]"><Sparkles className="h-4 w-4" />Featured</span><h2 className="mt-4 text-2xl font-black leading-tight text-[#1D1B19]">Teej Makeup + Hair</h2><p className="mt-2 text-base font-bold text-[#9B8468]">₹3,000 promotional listing</p><p className="mt-4 text-sm leading-6 text-[#746F69]">Ask the salon to confirm availability, inclusions and appointment timing before booking.</p><a href={getWhatsAppLink(shopConfig.contact.clientPhoneE164, message)} target="_blank" rel="noopener noreferrer" className="mt-5 flex h-12 items-center justify-center rounded-2xl bg-[#1D1B19] text-sm font-black text-white">Ask on WhatsApp</a></motion.section>
  </div></main>
}
