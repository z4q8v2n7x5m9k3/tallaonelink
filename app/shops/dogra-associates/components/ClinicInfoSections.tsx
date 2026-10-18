'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarCheck, MapPin, Navigation, Sparkles } from 'lucide-react'
import { shopConfig } from '../config'
import { playClickSound } from '../../../lib/playClickSound'

export default function ClinicInfoSections() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.35, ease: 'easeOut' }} className="w-full max-w-md mx-auto py-6">
      <div className="mb-5">
        <div className="section-title-accent mb-2"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 text-left">Nearest Branch</h2></div>
        <p className="text-sm sm:text-base text-slate-600 text-left">Choose the Femina branch closest to you.</p>
      </div>
      <div className="space-y-3">
        {shopConfig.branches.map((branch, index) => (
          <motion.article key={branch.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ delay: index * 0.04, duration: 0.25 }} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F3C7D8] bg-white p-4 shadow-[0_10px_24px_rgba(179,42,100,0.10)]">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-base font-black text-slate-950"><MapPin className="h-4 w-4 shrink-0 text-[#B32A64]" />{branch.name}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-600">{branch.address}</p>
              <p className="mt-1 text-xs font-semibold text-[#B32A64]">{branch.phone}</p>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#FFF1F6] px-3 py-2 text-xs font-black text-[#B32A64] ring-1 ring-[#F3C7D8] transition hover:bg-[#FFE5EF]"><Navigation className="h-3.5 w-3.5" />Maps</a>
          </motion.article>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link href="/book-consultation" onClick={() => playClickSound()} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#B32A64] text-sm font-black text-white shadow-[0_12px_24px_rgba(179,42,100,0.24)]"><CalendarCheck className="h-4 w-4" />Book Appointment</Link>
        <a href={`https://wa.me/${shopConfig.whatsapp.defaultPhone}?text=${encodeURIComponent('Hi Veloura Salon, I would like help choosing the demo studio.')}`} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#F3C7D8] bg-white text-sm font-black text-[#B32A64] shadow-[0_10px_20px_rgba(179,42,100,0.10)]"><Sparkles className="h-4 w-4" />Ask on WhatsApp</a>
      </div>
    </motion.section>
  )
}
